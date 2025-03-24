import { Router } from "express";
import authRouter from "./auth.js";
import productsRouter from "./products.js";
import cartsRouter from "./carts.js";
import ordersRouter from "./orders.js";
import categoriesRouter from "./categories.js";
import commentsRouter from "./comments.js"; // Import routes bình luận

const router = Router();

router.get("/", (req, res) => {
  res.send("Home");
});

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/orders", ordersRouter);
router.use("/categories", categoriesRouter);
router.use("/", commentsRouter); // Thêm routes bình luận

export default router;
