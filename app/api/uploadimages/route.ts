import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { getSessionAtHome } from "@/auth";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

interface CloudinaryUploadResult {
    public_id: string;
    [key: string]: any
}

export async function POST(request: NextRequest) {
    const session = await getSessionAtHome();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const data = await request.formData();
        const image = data.get("image") as File | null;
        if (!image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({
                    folder: "profile-picture"
                },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    })
                uploadStream.end(buffer);
            }
        )
        const { public_id } = result;
        const imageUrl = cloudinary.url(public_id, {
            transformation: [
                { width: 200, height: 200, crop: "thumb" }
            ]
        });
        return NextResponse.json({ imageUrl, public_id }, { status: 200 });
    } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json({ error: "Error uploading image" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const session = await getSessionAtHome();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { publicId } = await request.json();
        if (!publicId) {
            return NextResponse.json({ error: "No public ID provided" }, { status: 400 });
        }
        await cloudinary.uploader.destroy(publicId);
        return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting image:", error);
        return NextResponse.json({ error: "Error deleting image" }, { status: 500 });
    }
}