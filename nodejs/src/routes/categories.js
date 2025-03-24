import { Router } from "express";
import { CategoriesController, upload } from "../controllers/categories.js";

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.get("/", categoriesController.getAllCategories);
categoriesRouter.get("/:id", categoriesController.getCategoryDetail);
categoriesRouter.post("/", upload.single("image"), categoriesController.createCategory); // Hỗ trợ upload ảnh
categoriesRouter.put("/:id", upload.single("image"), categoriesController.updateCategory); // Hỗ trợ cập nhật ảnh
categoriesRouter.delete("/:id", categoriesController.deleteCategory);

export default categoriesRouter;
