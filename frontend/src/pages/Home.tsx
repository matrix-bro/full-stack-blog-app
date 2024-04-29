import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { BlogListProps } from "../types";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState<BlogListProps[]>([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreBlogs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/blogs/?page=${page}`
      );
      // console.log(res);
      setBlogs((prevBlogs) => [...prevBlogs, ...res.data.results]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(!!res.data.next);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/blogs/`);
        // console.log(res);
        setBlogs(res.data.results);
        setHasMore(!!res.data.next);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <h1 className="text-center text-3xl">Recent Blogs</h1>
      <InfiniteScroll
        dataLength={blogs.length}
        next={fetchMoreBlogs}
        hasMore={hasMore}
        loader={<p className="text-center">Scroll to load more...</p>}
        endMessage={<p className="text-center">No more items to load!</p>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 px-8">
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
    </>
  );
};

export default Home;
