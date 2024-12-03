import  Payment  from '../../models/payment.js'
import Stripe from 'stripe';
import crypto from 'crypto';

// Decrypt function to decrypt the encrypted Stripe secret key
const decrypt = (encryptedText) => {
    const [iv, encrypted] = encryptedText.split(':');
    const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Encryption key for your decryption
    const ivBuffer = Buffer.from(iv, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, ivBuffer);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

// Conversion rate: Hardcoded for simplicity
const LKR_TO_USD_RATE = 0.003; // Update this with the current conversion rate

export const createCheckoutSession = async (req, res) => {
    try {
        const { booking, vendorId } = req.body;

        // Fetch the encrypted Stripe secret key for the vendor
        const paymentRecord = await Payment.findOne({ where: { user_id: vendorId } });

        if (!paymentRecord || !paymentRecord.payment_key) {
            return res.status(400).json({ message: 'Vendor payment details not found' });
        }

        // Decrypt the Stripe secret key for the vendor
        const decryptedStripeSecretKey = decrypt(paymentRecord.payment_key);

        // Now initialize Stripe with the decrypted secret key for this vendor
        const stripe = new Stripe(decryptedStripeSecretKey);  // Use vendor-specific secret key

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: booking.map((item) => {
                const priceInUSD = item.price * LKR_TO_USD_RATE;
                const unitAmountInCents = Math.round(priceInUSD * 100); // Convert dollars to cents

                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: unitAmountInCents,
                    },
                    quantity: 1,
                };
            }),
            mode: 'payment',
            success_url: 'http://localhost:5173/client/payment/success',
            cancel_url: 'http://localhost:5173/client/payment/cancel',
            metadata: { vendorId: vendorId },  // Include vendor ID to track the payment
        });

        // Creating a notification: @success
        await Notification.create({
            title: 'Payment Successful',
            description: `Your payment was successful. Reference ID: ${session.id}`,
            priority: 'high',
            viewed: false,
            user_id: req.user.id,
        })

        res.status(200).json({ id: session.id });
    }
    catch (error) {

        // Creating a notification: @fail
        await Notification.create({
            title: 'Payment Failed',
            description: `Your payment was unsuccessful. Reason: ${error.message}`,
            priority: 'high',
            viewed: false,
            user_id: req.user.id,
        })

        console.error('Error creating checkout session:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

