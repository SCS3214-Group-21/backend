export const isAuthorize = async (req, res, next) => {
    try {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            return res.status(422).json({
                message: 'Please provide token'
            });
        }

        next();

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Server Error'
        }); // Optionally, send a response in case of error
    }
};
