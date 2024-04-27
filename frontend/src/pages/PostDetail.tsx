import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { BlogDetailsProps } from "../types";
import { useAppSelector } from "../redux/hooks";

const PostDetail = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = useState<BlogDetailsProps>(Object);
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/blogs/${id}/`)
      .then((res) => {
        // console.log(res);
        setBlogDetails({ ...res.data });
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }, [id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (localStorage.getItem("token") == null) {
      alert("You need to login first!");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/api/blog/${id}/comment/`,
        { content },
        config
      );

      console.log(response.data);
      window.location.reload();
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl md:text-4xl">{blogDetails.title}</h1>
        <div className="pt-2">
          {blogDetails.tags &&
            blogDetails.tags.map((tag, index) => (
              <span key={index} className="px-1 text-blue-600">
                {tag.name}
              </span>
            ))}
        </div>
        <p className="text-lg pt-5">{blogDetails.content}</p>
      </div>

      <div className="mt-5">
        <h3 className="text-xl font-bold border-b">Comments:</h3>
        {blogDetails.comments &&
          blogDetails.comments.map((comment, index) => (
            <div key={index} className="my-5">
              {comment.content} by {comment.user.first_name}
            </div>
          ))}

        <form onSubmit={onSubmit}>
          <div>
            <textarea
              className="border-2 border-black px-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              cols={50}
              placeholder="Write a comment"
              required
            />
          </div>
          <button className="bg-teal-400 py-2 px-4 rounded-md">Submit</button>
        </form>
      </div>
    </>
  );
};

export default PostDetail;
