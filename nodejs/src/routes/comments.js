import { Router } from "express";
import CommentsController from "../controllers/comments.js";

const commentsRouter = Router();
const commentsController = new CommentsController();

commentsRouter.get("/products/:id/comments", commentsController.getComments); // Lấy danh sách bình luận
commentsRouter.post("/products/:id/comments", commentsController.addComment); // Thêm bình luận
commentsRouter.delete("/comments/:commentId", commentsController.deleteComment); // Xóa bình luận

export default commentsRouter;
