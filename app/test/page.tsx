import Blog from '@/models/blogs.models';
import User from '@/models/users.models';
import { connectDB } from '@/utils/db'
import React from 'react'

async function changePassword() {
  await connectDB();
  try {
    const user = await User.findOne({ username: 'r' });
    if (!user) {
      console.log('User not found');
      return {
        success: false,
        message: 'User not found'
      }
    }
    // Delete the account
    await Blog.deleteMany({ createdBy: user.email });
    await user.deleteOne();
    console.log('User deleted successfully');
    return {
      success: true,
      message: 'User deleted successfully'
    }

  } catch (error) {
    console.error('Error changing password:', error);
    return {
      success: false,
      message: (error as Error).message
    }
  }
}

const page = async () => {

  const response = await changePassword();
  return (
    <div>
      <h1>Change Password</h1>
      <p>{response.message}</p>
      <p>{response.success ? 'Password changed successfully' : 'Failed to change password'}</p>
      <p>{response.success ? 'Please login again' : 'Please try again later'}</p>
    </div>
  )
}

export default page
