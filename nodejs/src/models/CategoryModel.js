import mongoose from "mongoose";
import Product from "./ProductModel.js"; // Import model Product

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String, required: false }, // Thêm trường ảnh
});

// Middleware: Xóa tất cả sản phẩm trước khi xóa danh mục
CategorySchema.pre("findOneAndDelete", async function (next) {
  const categoryId = this._conditions._id;
  await Product.deleteMany({ categoryId });
  next();
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
