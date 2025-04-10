import { connectDB } from "@/utils/db";
import Blog from "@/models/blogs.models";
import { isValidObjectId } from "mongoose";
import { isValidSlug } from "@/lib/common-function";
import { ErrorMessage } from "@/lib/ErrorMessage";
import EditBlogComponent from "./EditComponent";
import { EditBlogState } from "@/types/blogs-types";
import { Suspense } from "react";
import LoadingEffect from "@/lib/LoadingEffect";

await connectDB();

async function getBlogData(id: string): Promise<EditBlogState> {
    const nullresponse = {
        success: false,
        error: '',
        isInitializing: false,
        isLoading: false,
        title: "",
        thumbnail: null,
        thumbnailCredit: null,
        htmlContent: "",
        markdownContent: "",
        tags: [],
        category: "",
        status: "draft",
        blogId: "",
        createdBy: "",
        editorMode: "markdown" as 'markdown' | 'visual' | 'html',
        slug: "",
        tagAutoGen: false,
    };

    if (!id) {
        return { ...nullresponse, error: "Blog id required to edit the blog...", status: "draft" as 'draft' }
    }

    try {
        const post = isValidObjectId(id)
            ? await Blog.findById(id)
            : isValidSlug(id)
                ? await Blog.findOne({ slug: id })
                : null;

        if (!post) return { ...nullresponse, error: "Blog post not found, please check the id...", status: "draft" as 'draft' };

        return {
            success: true,
            isInitializing: false,
            isLoading: false,
            error: "",
            title: post.title,
            thumbnail: post.thumbnail,
            thumbnailCredit: post.thumbnailCredit,
            htmlContent: post.language === "html" ? post.content : "",
            markdownContent: post.language === "markdown" ? post.content : "",
            tags: post.tags,
            category: post.category,
            status: post.status,
            blogId: post._id.toString(),
            createdBy: post.createdBy,
            editorMode: post.language as 'markdown' | 'visual' | 'html',
            slug: post.slug,
            tagAutoGen: post.tagAutoGen,
        };
    } catch (error) {
        console.error("Error fetching blog post data:", error);
        return { ...nullresponse, status: "draft" };
    }
}

// export async function generateStaticParams() {
//     await connectDB();
//     const posts = await Blog.find({}, { slug: 1, _id: 1 });

//     return posts.flatMap(post => [
//         { id: post._id.toString() },
//         { id: post.slug }
//     ]);
// }

async function EditPost({ id }: { id: string }) {
    const blogData = await getBlogData(id);
    if (!blogData.success) {
        return <ErrorMessage message={blogData.error || "Something went wrong"} />;
    }
    return <EditBlogComponent BlogData={blogData} />;
}

const EditBlog = ({ params }: { params: { id: string } }) => (
    <Suspense fallback={<LoadingEffect />}>
        <EditPost id={params.id} />
    </Suspense>
);

export default EditBlog;