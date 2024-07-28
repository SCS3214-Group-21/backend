import path from 'path'
import fs from 'fs'
import fsPromises from 'fs/promises'
import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'

const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        const logsDir = path.join(path.dirname('.'), 'logs')
        if (!fs.existsSync(logsDir)) {
            await fsPromises.mkdir(logsDir)
        }
        await fsPromises.appendFile(path.join(logsDir, logFileName), logItem)
    }
    catch (err) {
        console.error(err.message)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
        .then(() => {
            console.log(`${req.method} ${req.path}`)
            next()
        })
        .catch(err => {
            console.error(err.message)
            next()
        })
}

export { logEvents, logger }