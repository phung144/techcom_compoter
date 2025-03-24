import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Inputs, CategoryForm } from "../../components/CategoryForm";
import { addCategory } from "../../services/Category";

export default function CategoryAdd() {
  const nav = useNavigate();

  const handleAddCategory: SubmitHandler<Inputs> = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0]); // Lấy file đầu tiên
    }

    addCategory(formData)
      .then(() => {
        toast.success("Category added successfully!");
        nav("/admin/category/list");
      })
      .catch(() => toast.error("Error adding category"));
  };

  return (
    <div className="container">
      <h1>Add Category</h1>
      <CategoryForm onSubmit={handleAddCategory} />
    </div>
  );
}
