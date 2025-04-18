import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  postId: {
    type: String,
    ref: "blogs",
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;
