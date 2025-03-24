import { StatusCodes } from "http-status-codes";
import Category from "../models/CategoryModel.js";
import ApiError from "../utils/ApiError.js";
import multer from "multer"; // Import multer để xử lý file upload

// Cấu hình multer để lưu ảnh vào thư mục "uploads"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Thư mục lưu ảnh
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Đổi tên file để tránh trùng lặp
  },
});
const upload = multer({ storage });

class CategoriesController {
  // GET /categories - Lấy danh sách danh mục
  async getAllCategories(req, res, next) {
    try {
      const categories = await Category.find();
      res.status(StatusCodes.OK).json(categories);
    } catch (error) {
      next(error);
    }
  }

  // GET /categories/:id - Lấy chi tiết danh mục
  async getCategoryDetail(req, res, next) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) throw new ApiError(404, "Category Not Found");
      res.status(StatusCodes.OK).json(category);
    } catch (error) {
      next(error);
    }
  }

  // POST /categories - Tạo danh mục mới (hỗ trợ upload ảnh)
  async createCategory(req, res, next) {
    try {
      const { name, description } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null; // Lưu đường dẫn ảnh

      const newCategory = await Category.create({ name, description, image });
      res.status(StatusCodes.CREATED).json({
        message: "Category Created Successfully",
        data: newCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /categories/:id - Cập nhật danh mục (có hỗ trợ đổi ảnh)
  async updateCategory(req, res, next) {
    try {
      const { name, description } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : req.body.image; // Giữ ảnh cũ nếu không có ảnh mới

      const updateCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { name, description, image },
        { new: true }
      );
      if (!updateCategory) throw new ApiError(404, "Category Not Found");

      res.status(StatusCodes.OK).json({
        message: "Category Updated Successfully",
        data: updateCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /categories/:id - Xóa danh mục (tự động xóa sản phẩm)
  async deleteCategory(req, res, next) {
    try {
      const category = await Category.findOneAndDelete({ _id: req.params.id });
      if (!category) throw new ApiError(404, "Category Not Found");

      res.status(StatusCodes.OK).json({
        message: "Category and related products deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export { CategoriesController, upload };
