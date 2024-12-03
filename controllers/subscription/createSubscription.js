import Stripe from 'stripe';
import Subscription from '../../models/subscription.js';
import User from '../../models/user.js';
import moment from 'moment';

export const createSubscription = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming `req.user.id` is the logged-in user's ID

        // Fetch the user details
        const user = await User.findByPk(userId);
        if (!user ) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        // Check if the user already has an active subscription
        const existingSubscription = await Subscription.findOne({
            where: { vendor_id: user.id, status: 'active' },
        });

        if (existingSubscription) {
            return res.status(400).json({ message: 'Active subscription already exists' });
        }

        // Check if the user qualifies for a free month
        const firstMonthFree = moment(user.created_at).add(1, 'month');
        const isFreeMonth = moment().isBefore(firstMonthFree);

        if (isFreeMonth) {
            // Add free subscription
            const freeSubscription = await Subscription.create({
                vendor_id: user.id,
                start_date: moment().toDate(),
                end_date: firstMonthFree.toDate(),
                status: 'active',
            });

            return res.status(200).json({
                message: 'Free subscription activated.',
                subscription: freeSubscription,
            });
        }

        // Create Stripe subscription for paid users
        const stripe = new Stripe(process.env.STRIPE_SECRET);

        const customer = await stripe.customers.create({
            email: user.email,
        });

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: 'price_1QS1wQKt5ygtiLn422XC5GcV' }], 
            metadata: { userId: user.id },
        });

        // Save subscription in the database
        const newSubscription = await Subscription.create({
            vendor_id: user.id,
            start_date: moment().toDate(),
            stripe_subscription_id: subscription.id,
            status: 'active',
        });

        res.status(200).json({
            message: 'Subscription created successfully.',
            subscription: newSubscription,
        });
    } catch (error) {
        console.error('Error creating subscription:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
