import User from "../../models/user.model.js";

export const getUsersForSidebar = async(req,res)=> {

    try {

        const loggedInUserId = req.user.id
        const loggedInUserRole = req.user.role;

         // Determine opposite role
         const oppositeRole = loggedInUserRole === 'client' ? 'vendor' : 'client';

        // Fetch users with the opposite role
        const filteredUsers = await User.find({
            id: { $ne: loggedInUserId },  // Exclude the logged-in user
            role: oppositeRole  // Fetch users with opposite role
        }).select("-password");  //not get myself messages and not return passwords

        res.status(200).json(filteredUsers)
        
    } catch (error) {
        console.error("Error in getUsersForSidebar controller", error.message);
        res.status(500).json({error:"Internal server error"})
    }
}


