import asyncHandler from 'express-async-handler'
import { mysqlPool } from '../../config/database.js'

const getProfile = asyncHandler(async (req, res) => {
    const { client_id } = req.body
    if (!client_id) {
        return res.status(400).send('Client ID is required')
    }

    let connection

    try {
        connection = await mysqlPool.getConnection()

        // check whether user exists
        const [existingClient] = await mysqlPool.query(
            'SELECT * FROM client_profile WHERE client_id = ?',
            [client_id]
        )

        if (existingClient.length === 0) {
            return res.status(404).json({message: 'User not found'})
        }

        const user = existingClient[0]
        res.status(200).json({user})
    }
    catch (err) {
        console.error('Error getting client profile: ', err)
        res.status(500).json({ message: err.message })
    }
    finally {
        if (connection) connection.release()
    }
})

const createProfile = asyncHandler(async (req, res) => {
    const {client_id, bride_name, groom_name, wed_date } = req.body

    if (!client_id) {
        return res.status(400).json({message: 'Client ID is required'})
    }

    let connection

    try {
        connection = await mysqlPool.getConnection()

        // check whether user exists
        const [existingClient] = await connection.query(
            'SELECT * FROM auth WHERE id=?',
            [client_id]
        )

        if (existingClient.length === 0) {
            return res.status(404).json({message: 'User not found' })
        }

        const [sessionResult] = await connection.query(
            'INSERT INTO client_profile (client_id, bride_name, groom_name, wed_date) VALUES (?, ?, ?, ?)',
            [client_id, bride_name, groom_name, wed_date]
        )

        if (sessionResult.affectedRows === 0) {
            return res.status(500).json({ message: 'Failed to create session' })
        }

        res.status(200).json({ message: 'Successfully created profile' })
    }
    catch (err) {
        console.error('Error creating profile: ', err.message)
        res.status(500).json({ message: err.message })
    }
    finally {
        if (connection) connection.release()
    }
})

const updateProfile = asyncHandler(async (req, res) => {
    const { client_id, bride_name, groom_name, wed_date } = req.body

    if(!client_id) {
        return res.status(400).json({message: 'Client ID is required'})
    }

    let connection

    try {
        connection = await mysqlPool.getConnection()

        // check whether user exists
        const [existingClient] = await connection.query(
            'SELECT * FROM auth WHERE id = ?',
            [client_id]
        )

        if (existingClient.length === 0) {
            return res.status(404).json({message: 'User not found'})
        }

        const [updateProfile] = await connection.query(
            'UPDATE client_profile SET bride_name = ?, groom_name = ?, wed_date = ? WHERE client_id = ?',
            [bride_name, groom_name, wed_date, client_id]
        )

        if (updateProfile.affectedRows === 0) {
            return res.status(500).json({message: 'Failed to update profile'})
        }

        res.status(200).json({ message: 'Successfully updated profile' })
    }
    catch (err) {
        console.error('Error updating profile: ', err.message)
        res.status(500).json({ message: err.message })
    }
    finally {
        if (connection) connection.release()
    }
})

const deleteProfile = asyncHandler(async (req, res) => {
    const { client_id } = req.body

    if (!client_id) {
        return res.status(400).json({message: 'Client ID is required'})
    }

    let connection

    try {
        connection = await mysqlPool.getConnection()

        // check whether connection exists
        const [existingClient] = await connection.query(
            'SELECT * FROM auth WHERE id = ?',
            [client_id]
        )

        if (existingClient.length === 0) {
            return res.status(404).json({message: 'User not found'})
        }

        const [deleteResult] = await connection.query(
            'DELETE FROM client_profile WHERE client_id = ?',
            [client_id]
        )

        if (deleteResult.affectedRows === 0) {
            return res.status(500).json({message: 'Failed to delete profile'})
        }

        res.status(200).json({ message: 'Successfully deleted profile' })
    }
    catch (err) {
        console.error("Error deleting profile: ", err.message)
        res.status(500).json({ message: err.message })
    }
    finally {
        if (connection) connection.release()
    }
})

export { createProfile, getProfile, updateProfile, deleteProfile }