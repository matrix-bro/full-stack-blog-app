import { useEffect, useState } from "react";
import axios from "axios";
import { BlogListProps } from "../types";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [blogs, setBlogs] = useState<BlogListProps[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      try {
        const res = await axios.get("http://localhost:8000/api/me/", config);
        // console.log(res.data.blog_posts);
        setBlogs(res.data.blog_posts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h1 className="text-center text-3xl">Your Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 px-8">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-gray-200 p-4">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="pt-5">{blog.content.slice(0, 100)} ...</p>
            <div className="flex space-x-2 flex-wrap">
              <Link
                className="bg-orange-400 hover:bg-orange-600 block py-1 px-3 mt-3"
                to={`/blogs/${blog.id}`}
              >
                View
              </Link>
              <Link
                className="bg-blue-400 hover:bg-blue-600 block py-1 px-3 mt-3"
                to={`/blog/${blog.id}/update`}
              >
                Update
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
