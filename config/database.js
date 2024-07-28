import mysql from 'mysql2/promise'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config()

// create a connection pool
const connectToDb = (callback) => {
    const mysqlPool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'euphoria'
    })
        .then(() => {
            if(callback)callback(null)
        })
        .catch((err) => {
            if(callback)callback(err)
        })
}

// load and execute procedures
const initDb = async () => {
    const proceduresPath = path.join(__dirname, 'procedures')
    const files = fs.readdirSync(proceduresPath)

    const connection = await mysqlPool.getConnection()
    try {
        for (const file of files) {
            const filePath = path.join(proceduresPath, file)
            const sql = fs.readFileSync(filePath, 'utf8')
            await connection.query(sql)
        }
        console.log('All procedures executed successfully')
    }
    catch (err) {
        console.error('Error executing procedures: ', err)
    }
    finally {
        connection.release()
    }
}

initDb()
    .then(() => {
        console.log('Database initialized')
    })
    .catch(err => {
        console.error('Error initializing database', err)
    })

export { connectToDb }