import axios from "axios";
import { useEffect, useState } from "react";
import { BlogListProps, CategoryProps } from "../types";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const Categories = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [blogs, setBlogs] = useState<BlogListProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [currCategory, setCurrCategory] = useState(0);

  useEffect(() => {
    // fetch categories
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/categories/");
        // console.log(res.data);
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch Default blogs
    const fetchDefaultBlogs = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/blogs/`);
        // console.log(res.data);
        setBlogs(res.data.results);
        setNextPage(res.data.next);
        setHasMore(!!res.data.next);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
    fetchDefaultBlogs();
  }, []);

  const fetchBlogs = async (id: number) => {
    // console.log("BLogs", id);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/category/${id}/blogs/`
      );
      // console.log(res.data);
      setBlogs(res.data.results);
      setNextPage(res.data.next);
      setHasMore(!!res.data.next);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoreBlogs = async () => {
    try {
      if (nextPage) {
        const res = await axios.get(nextPage);
        // console.log(res.data);
        setBlogs((prev) => [...prev, ...res.data.results]);
        setNextPage(res.data.next);
        setHasMore(!!res.data.next);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-4 ">
      <div className=" sm:col-span-1 bg-slate-900 text-white pl-3 pt-4 min-h-80">
        <h2 className="text-xl font-semibold underline tracking-wider">
          Categories
        </h2>
        <div className="space-y-1 mt-2 pb-4">
          {categories &&
            categories.map((category, index) => (
              <button
                key={index}
                className={`capitalize block text-lg tracking-wider hover:text-blue-500 ${
                  currCategory === category.id && "text-green-500"
                }`}
                onClick={() => {
                  fetchBlogs(category.id);
                  setCurrCategory(category.id);
                }}
              >
                {category.name}
              </button>
            ))}
        </div>
      </div>

      {/* Blogs */}
      <div className="sm:col-span-3  max-h-32">
        <InfiniteScroll
          dataLength={blogs.length}
          next={fetchMoreBlogs}
          hasMore={hasMore}
          loader={<p className="text-center">Scroll to load more...</p>}
          endMessage={<p className="text-center">No more items to load!</p>}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {blogs.map((blog: BlogListProps, index) => (
              <div key={index} className="bg-gray-200 p-4">
                <h2 className="text-xl font-bold">{blog.title}</h2>
                <p className="pt-5">{blog.content.slice(0, 100)} ...</p>
                <Link className="underline block pt-4" to={`/blogs/${blog.id}`}>
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Categories;
