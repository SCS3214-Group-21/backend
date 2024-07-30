import rateLimit from 'express-rate-limit'
import { logEvents } from './logger.js'

const loginLimiter = rateLimit({
    windowMs: 60 * 1000,    // 1 min
    max: 5,                 // 5 requests
    message: {
        message: "Too many login attempts"
    },
    handler: (req, res, next, {statusCode,message}) => {
        logEvents(`Too Many Requests: ${message.message}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
            .then(() => {
                res.status(statusCode).send(message)
                next()
            })
            .catch(err => {
                console.error(err.message)
                next(err)
            })
    },
    standardHeaders: true,  // return rate limit info in the RateLimit headers
    legacyHeaders: false,   // disable the X-RateLimit headers
})

export default loginLimiter