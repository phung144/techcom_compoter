import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "users", required: true }, // Người bình luận
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // Sản phẩm được bình luận
    content: { type: String, required: true }, // Nội dung bình luận
    createdAt: { type: Date, default: Date.now }, // Ngày tạo bình luận
  }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
