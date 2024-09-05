import {logEvents } from './logEvents.js'

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt')
        .then(() => {
            console.error(err.stack)
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