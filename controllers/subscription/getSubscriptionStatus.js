import Subscription from '../../models/subscription.js';
import moment from 'moment';

export const getSubscriptionStatus = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming `req.user.id` is the logged-in user's ID

        // Find the user's active subscription
        const activeSubscription = await Subscription.findOne({
            where: { vendor_id: userId, status: 'active' },
        });

        if (!activeSubscription) {
            return res.status(404).json({ message: 'No active subscription found.' });
        }

        // Check if the subscription is still valid
        const isExpired = moment().isAfter(activeSubscription.end_date);
        if (isExpired) {
            // Update subscription status to 'expired'
            activeSubscription.status = 'expired';
            await activeSubscription.save();

            return res.status(200).json({
                message: 'Subscription has expired.',
                subscription: null,
            });
        }

        // Return subscription details
        res.status(200).json({
            message: 'Active subscription found.',
            subscription: {
                id: activeSubscription.id,
                start_date: activeSubscription.start_date,
                end_date: activeSubscription.end_date,
                status: activeSubscription.status,
            },
        });
    } catch (error) {
        console.error('Error fetching subscription status:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
