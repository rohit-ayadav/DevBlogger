import mongoose from "mongoose";

const staticContentSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        view: {
            type: Number,
            default: 0,
        },
    }
);

const StaticContent = mongoose.models.StaticContent || mongoose.model("StaticContent", staticContentSchema);
export default StaticContent;