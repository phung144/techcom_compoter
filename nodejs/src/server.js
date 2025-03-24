import express from "express";
import cors from "cors";
import connectMongoDB from "./config/dbconfig";
import router from "./routes";

const app = express();
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Cho phép truy cập ảnh danh mục từ thư mục "uploads"
app.use("/uploads", express.static("uploads"));

const dbUrl = process.env.DB_URI || "mongodb+srv://root:123@cluster0.iki6m.mongodb.net/Tech_Website?retryWrites=true&w=majority&appName=Cluster0";

connectMongoDB(dbUrl);

app.use("/", router);

export const viteNodeApp = app;
