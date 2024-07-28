import {logEvents } from './logger.js'

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
        .then(() => {
            console.log(err.stack)

            const status = res.statusCode ? res.statusCode : 500    // server error

            res.status(status)
            res.json({ message: err.message })

            next()
        })
        .catch(err => {
            console.error(err.message)
            next(err)
        })
}

export default errorHandler