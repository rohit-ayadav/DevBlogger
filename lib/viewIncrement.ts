import incrementViewInDB from "@/action/incrementView";
import { isValidSlug } from "./common-function";

interface ViewResponse {
    error: boolean;
    message: string;
}

interface ViewedBlogs {
    [blogId: string]: string;
}

const incrementView = async (id: string, like: boolean, staticContent?: boolean): Promise<void> => {
    if (typeof window === 'undefined' || !id?.trim() || !isLocalStorageAvailable()) {
        // console.log('View increment skipped');
        return;
    }
    const STORAGE_KEY_FOR_BLOG_VIEWS = 'viewed_blogs';
    const STORAGE_KEY_FOR_BLOG_LIKES = 'liked_blogs';
    const STORAGE_KEY_FOR_BLOG_VIEWS_STATIC = 'viewed_blogs_static';
    try {
        const today = new Date().toISOString().slice(0, 10);

        // if like is true, it means the user has liked the post else the user has viewed the post
        if (like) {
            const storedBlogs = localStorage.getItem(STORAGE_KEY_FOR_BLOG_LIKES);
            let likedBlogs: ViewedBlogs = {};
            try {
                likedBlogs = storedBlogs ? JSON.parse(storedBlogs) : {};
            } catch {
                localStorage.removeItem(STORAGE_KEY_FOR_BLOG_LIKES);
            }
            likedBlogs = Object.fromEntries(
                Object.entries(likedBlogs).filter(([_, date]) => date === today)
            );
            if (likedBlogs[id] === today) {
                // console.log(`Like already incremented for blog post with ID: ${id}`);
                return;
            }
            const response: ViewResponse = await incrementViewInDB(id, true);
            if (response.error) {
                throw new Error(response.message);
            }
            likedBlogs[id] = today;
            localStorage.setItem(STORAGE_KEY_FOR_BLOG_LIKES, JSON.stringify(likedBlogs));
            // console.log(`Like incremented for blog post with ID: ${id}`);
        }
        else if (staticContent) {
            console.log('Static content view will be incremented');
            if (!isValidSlug(id)) {
                throw new Error("Invalid slug for static content view increment");
            }
            const storedBlogs = localStorage.getItem(STORAGE_KEY_FOR_BLOG_VIEWS_STATIC);
            let viewedBlogs: ViewedBlogs = {};
            try {
                viewedBlogs = storedBlogs ? JSON.parse(storedBlogs) : {};
            } catch {
                localStorage.removeItem(STORAGE_KEY_FOR_BLOG_VIEWS_STATIC);
            }
            viewedBlogs = Object.fromEntries(
                Object.entries(viewedBlogs).filter(([_, date]) => date === today)
            );
            if (viewedBlogs[id] === today) return;
            else {
                const response: ViewResponse = await incrementViewInDB(id, false, true);
                if (response.error) {
                    throw new Error(response.message);
                }
            }
            viewedBlogs[id] = today;
            localStorage.setItem(STORAGE_KEY_FOR_BLOG_VIEWS_STATIC, JSON.stringify(viewedBlogs));
            console.log(`View incremented for static content with ID: ${id}`);
        }
        else {
            const storedBlogs = localStorage.getItem(STORAGE_KEY_FOR_BLOG_VIEWS);
            let viewedBlogs: ViewedBlogs = {};
            try {
                viewedBlogs = storedBlogs ? JSON.parse(storedBlogs) : {};
            } catch {
                localStorage.removeItem(STORAGE_KEY_FOR_BLOG_VIEWS);
            }
            viewedBlogs = Object.fromEntries(
                Object.entries(viewedBlogs).filter(([_, date]) => date === today)
            );
            if (viewedBlogs[id] === today) return;

            const response: ViewResponse = await incrementViewInDB(id, false);
            if (response.error) {
                throw new Error(response.message);
            }
            viewedBlogs[id] = today;
            localStorage.setItem(STORAGE_KEY_FOR_BLOG_VIEWS, JSON.stringify(viewedBlogs));
            // console.log(`View incremented for blog post with ID: ${id}`);
        }
    } catch (error) {
        console.error('[Blog View Tracking Error]:', {
            blogId: id,
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        });
    }
}

const isLocalStorageAvailable = (): boolean => {
    try {
        const test = '__test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch {
        return false;
    }
};

export { incrementView, type ViewResponse };