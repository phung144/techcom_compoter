import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getCategoryDetail, addCategory } from "../services/Category";

export type Inputs = {
  name: string;
  description: string;
  image?: FileList; // Lưu file ảnh
};

type Props = {
  categoryId?: string;
  onSubmit: SubmitHandler<Inputs>;
};

export function CategoryForm({ categoryId, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (!categoryId) return;
    getCategoryDetail(categoryId)
      .then(({ data }) => reset(data))
      .catch(() => toast.error("Error"));
  }, [categoryId]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Category Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          {...register("name", { required: "Name is required" })}
        />
        {errors?.name && <small className="text-danger">{errors.name.message}</small>}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          rows={3}
          {...register("description")}
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Image
        </label>
        <input
          type="file"
          className="form-control"
          id="image"
          {...register("image")}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
