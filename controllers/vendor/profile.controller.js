import asyncHandler from 'express-async-handler'
import { mysqlPool } from '../../config/database.js'

const getProfile = asyncHandler(async (req, res) => {
    const { client_id } = req.body
    if (!client_id) {
        return res.status(400).json({ message: "Client ID is required "})
    }

    let connection

    try {
        connection = await mysqlPool.getConnection()

        // check whether user exists
        const [existingVendor] = await mysqlPool.query(
            'SELECT * FROM auth WHERE id = ?',
            [client_id]
        )
        if (existingVendor.length === 0) {
            return res.status(404).json({ message: 'User not found' })
        }

        // check whether profile exists
        const [vendorProfile] = await mysqlPool.query(
            'SELECT * FROM vendor_profile WHERE client_id = ?',
            [client_id]
        )
        if (vendorProfile.length === 0) {
            return res.status(404).json({ message: "Profile not exists" })
        }

        const profile = vendorProfile[0]
        res.status(200).json({ profile })
    }
    catch (err) {
        console.error('Error getting vendor profile: ', err.message)
        res.status(500).json({ message: err.message })
    }
    finally {
        if (connection) connection.release()
    }
})

const createProfile = asyncHandler(async(req, res) => {
    const {client_id, name, business_name, nic, nic_image, logo, vendor_type} = req.body

    if (!client_id) {
        return res.status(400).json({ message: 'Client ID is required' })
    }

    let connection

    try {
        connection = await mysqlPool.getConnection()

        // check whether user exists
        const [existingVendor] = await connection.query(
            'SELECT * FROM auth WHERE id=?',
            [client_id]
        )

        if (existingVendor.length === 0) {
            return res.status(404).json({ message: 'User not found' })
        }

        const [sessionResult] = await connection.query(
            'INSERT INTO vendor_profile (client_id, name, business_name, nic, nic_image, logo, vendor_type) VALUES (?,?,?,?,?,?,?)',
            [client_id, name, business_name, nic, nic_image, logo, vendor_type]
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
    const {client_id, name, business_name, nic, nic_image, logo, vendor_type} = req.body

    if (!client_id) {
        return res.status(400).json({ message: 'Client ID is required' })
    }

    let connection

    try {
        connection = await mysqlPool.getConnection()

        // check whether user exists
        const [existingVendor] = await connection.query(
            'SELECT * FROM auth WHERE id = ?',
            [client_id]
        )

        if (existingVendor.length === 0) {
            return res.status(404).json({ message: 'User not found' })
        }

        const [updateProfile] = await connection.query(
            'UPDATE vendor_profile SET name = ?, business_name = ?, nic = ?, nic_image = ?, logo = ?, vendor_type = ?',
            [name, business_name, nic, nic_image, logo, vendor_type]
        )

        if (updateProfile.affectedRows === 0) {
            return res.status(500).json({ message: 'Failed to update profile' })
        }

        res.status(200).json({ message: 'Successfully updated profile' })
    }
    catch (err) {
        console.error('Failed to update profile: ', err.message)
        res.status(500).json({ message: err.message })
    }
    finally {
        if (connection) connection.release()
    }
})

const deleteProfile = asyncHandler(async (req, res) => {
    const { client_id } = req.body

    if (!client_id) {
        return res.status(400).json({ message:"Client ID is required" })
    }

    let connection

    try {
        connection = await mysqlPool.getConnection()

        // check whether client exists
        const [existingVendor] = await connection.query(
            'SELECT * FROM auth WHERE id = ?',
            [client_id]
        )
        if (existingVendor.length === 0) {
            return res.status(404).json({ message: 'User not found' })
        }

        const [deleteResult] = await connection.query(
            'DELETE FROM vendor_profile WHERE client_id = ?',
            [client_id]
        )
        if (deleteResult.affectedRows === 0) {
            return res.status(200).json({ message: 'Failed to delete profile' })
        }

        res.status(200).json({ message: 'Successfully deleted profile' })
    }
    catch (err) {
        console.error("Error deleting profile: ", err)
        res.status(500).json({ message: err.message })
    }
    finally {
        if (connection) connection.release()
    }
})

export { getProfile, createProfile, updateProfile, deleteProfile }