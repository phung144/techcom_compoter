import { StatusCodes } from "http-status-codes";
import Comment from "../models/CommentModel.js";
import User from "../models/UserModel.js";
import ApiError from "../utils/ApiError.js";

class CommentsController {
  // GET /products/:id/comments - Lấy danh sách bình luận theo sản phẩm
  async getComments(req, res, next) {
    try {
      const comments = await Comment.find({ product: req.params.id })
        .populate("user", "username email image role") // Lấy thông tin user (kèm avatar, role)
        .lean();

      res.status(StatusCodes.OK).json(comments);
    } catch (error) {
      next(error);
    }
  }

  // POST /products/:id/comments - Thêm bình luận vào sản phẩm
  async addComment(req, res, next) {
    try {
      const { userId, content } = req.body;
      const user = await User.findById(userId);

      if (!user) throw new ApiError(404, "User Not Found");

      const newComment = await Comment.create({ user: userId, product: req.params.id, content });

      res.status(StatusCodes.CREATED).json({ message: "Comment added successfully", data: newComment });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /comments/:commentId - Xóa bình luận (chỉ cho phép chủ sở hữu hoặc admin)
  async deleteComment(req, res, next) {
    try {
      const { userId } = req.body; // Lấy userId từ request (người yêu cầu xóa)
      const comment = await Comment.findById(req.params.commentId);
      const user = await User.findById(userId);

      if (!comment) throw new ApiError(404, "Comment Not Found");
      if (!user) throw new ApiError(404, "User Not Found");

      // Kiểm tra nếu user không phải chủ sở hữu và không phải admin
      if (comment.user.toString() !== userId && user.role !== "admin") {
        throw new ApiError(403, "You do not have permission to delete this comment");
      }

      await Comment.findByIdAndDelete(req.params.commentId);

      res.status(StatusCodes.OK).json({ message: "Comment deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default CommentsController;
