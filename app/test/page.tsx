import React from 'react'
import { connectDB } from '@/utils/db'
import Blog from '@/models/blogs.models'

const page = () => {
    // status: {
    //     type: String,
    //   enum: ["draft", "archived", "private", "pending_review", "rejected", "deleted", "approved"],
    //   default: "draft"
    // },
    // Remove isPublic from each blog

    const updateBlogStatus = async () => {
        await connectDB()
        const blogs = await Blog.find({}).exec()
        if (!blogs) {
            console.log("No blogs found")
            return
        }
        for (const blog of blogs) {
            if (blog.status === "published") {
                blog.status = "approved"
                await blog.save()
            }
        }
        console.log("Blogs updated successfully")
        console.log(blogs)
    }
        // updateBlogStatus()

  return (
    <div>
        <h1>Update Blog Status</h1>
        <p>Check the console for the result of the update operation.</p>
    </div>
  )
}

export default page
