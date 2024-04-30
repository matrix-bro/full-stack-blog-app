import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BlogDetailsProps,
  BlogFormFields,
  CategoryProps,
  TagProps,
} from "../types";
import { useParams } from "react-router-dom";

const PostUpdate = () => {
  const [blogDetails, setBlogDetails] = useState<BlogDetailsProps>(Object);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<BlogFormFields>();

  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [tags, setTags] = useState<TagProps[]>([]);
  const { id } = useParams();

  const onSubmit: SubmitHandler<BlogFormFields> = async (data) => {
    console.log(data);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/api/blog/${id}/update/`,
        data,
        config
      );

      console.log(response.data);
      alert("Updated Post Successfully!");
      window.location.reload();
    } catch (error) {
      alert("Failed to update post details.");
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch categories and tags
    const fetchCategoriesAndTags = async () => {
      try {
        const categoriesResponse = await axios.get(
          "http://localhost:8000/api/categories/"
        );

        const tagsResponse = await axios.get("http://localhost:8000/api/tags/");

        setCategories(categoriesResponse.data);
        setTags(tagsResponse.data);
      } catch (error) {
        console.error("Error fetching categories and tags:", error);
      }
    };

    // fetch blog details
    const fetchBlogDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/blogs/${id}`);
        // console.log(res.data);
        setBlogDetails(res.data);
        setValue("title", res.data.title);
        setValue("content", res.data.content);

        const defCatIds = res.data.categories.map((category: CategoryProps) =>
          category.id.toString()
        );
        const defTagIds = res.data.tags.map((tag: TagProps) =>
          tag.id.toString()
        );
        reset({ categories: defCatIds, tags: defTagIds });
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchCategoriesAndTags();
    fetchBlogDetails();
  }, []);

  return (
    <div className="md:w-1/2 my-6 mx-auto p-6 bg-gray-100 rounded-xl">
      <h1 className="mb-6 text-3xl text-center font-bold tracking-wide">
        Update "{blogDetails.title}"
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <p>Title:</p>
          <input
            type="text"
            className="border py-2 px-2 w-full"
            {...register("title", {
              required: "Title is required",
            })}
          />
          {errors.title && (
            <p className="text-red-400">{errors.title.message}</p>
          )}
        </div>
        <div>
          <p>Content:</p>
          <textarea
            className="border py-2 px-2 w-full"
            rows={4}
            {...register("content", {
              required: "Content is required",
            })}
          />
          {errors.content && (
            <p className="text-red-400">{errors.content.message}</p>
          )}
        </div>

        <div>
          <p>Select Categories: (Hold CTRL to choose multiple options)</p>
          <select
            className="border-2 border-black w-full"
            multiple
            {...register("categories", {
              required: "Please select at least one option",
            })}
          >
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categories && (
            <p className="text-red-400">{errors.categories.message}</p>
          )}
        </div>

        <div>
          <p>Select Tags: (Hold CTRL to choose multiple options)</p>
          <select
            className="border-2 border-black w-full"
            multiple
            {...register("tags", {
              required: "Please select at least one option",
            })}
          >
            {tags.map((tag, index) => (
              <option key={index} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
          {errors.tags && <p className="text-red-400">{errors.tags.message}</p>}
        </div>

        <button type="submit" className="bg-blue-400 py-1 px-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostUpdate;
