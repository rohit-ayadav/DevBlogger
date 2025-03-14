"use server";
import { connectDB } from "@/utils/db";
import User from "@/models/users.models";
import { getSessionAtHome } from "@/auth";

await connectDB();
const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
        const session = await getSessionAtHome();
        if (!session) throw new Error('Session not found');
        if (!oldPassword || !newPassword) throw new Error('Please enter old and new password');

        const email = session.user.email;
        const user = await User.find({ email });
        if (!user) throw new Error('User not found');
        const isMatch = await user[0].comparePassword(oldPassword);
        if (!isMatch) throw new Error('Old password is incorrect');
        // if old and new password is same
        const newPasswordSame = await user[0].comparePassword(newPassword)
        if (newPasswordSame) throw new Error('New password cannot be the same as the old password');
        user[0].password = newPassword;
        await user[0].save();
        return 'Password updated successfully';
    } catch (error: any) {
        console.error(error);
        return error.message || 'An error occurred while changing the password';
    }
};
export default changePassword;
// export const revalidate = 0; // Disable revalidation for this function