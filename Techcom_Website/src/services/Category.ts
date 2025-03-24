import axios from "axios";

export type Category = {
  _id: string;
  name: string;
  description: string;
  image?: string;
};

type CategoryInput = {
  name: string;
  description: string;
  image?: FileList;
};

// Lấy danh sách tất cả danh mục
export const getAllCategories = () => {
  return axios.get("/categories");
};

// Lấy chi tiết danh mục theo ID
export const getCategoryDetail = (id: string) => {
  return axios.get(`/categories/${id}`);
};

// Xóa danh mục theo ID
export const deleteCategory = (id: string) => {
  return axios.delete(`/categories/${id}`);
};

// Thêm danh mục mới (hỗ trợ upload ảnh)
export const addCategory = (data: FormData) => {
  return axios.post("/categories", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Chỉnh sửa danh mục theo ID (có hỗ trợ đổi ảnh)
export const editCategory = (id: string, data: FormData) => {
  return axios.put(`/categories/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
