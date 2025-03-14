"use client";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

export default function Page() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/uploadimages", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setData(data);
      setImageUrl(data.imageUrl);
    } catch (error: any) {
      console.error("Error uploading image:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Image</h1>

      <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Choose File
        <input type="file" onChange={handleUpload} className="hidden" />
      </label>

      {loading && <p className="mt-4 text-gray-600">Uploading...</p>}

      {data && (
        <div className="mt-4 p-4 bg-gray-100 rounded w-full max-w-md">
          <h2 className="text-xl font-bold">API Response</h2>
          <pre className="text-sm overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {imageUrl && (
        <CldImage src={imageUrl} alt="Uploaded Image" width={200} height={200} className="mt-4" />
      )}

      {imageUrl && (
        <CldImage
          src={`${data.public_id}`}
          alt="Uploaded Image"
          width={200}
          height={200}
          className="mt-4"
          loading="lazy"
          placeholder="blur"
          blurDataURL={imageUrl}
          sizes="(max-width: 200px) 100vw, 200px"
        />
      )}
    </div>
  );
}