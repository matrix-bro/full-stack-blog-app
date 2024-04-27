import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogDetailsProps } from "../types";

const PostDetail = () => {
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = useState<BlogDetailsProps>(Object);
  console.log(id, blogDetails);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/blogs/${id}/`)
      .then((res) => {
        console.log(res);
        setBlogDetails({ ...res.data });
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }, [id]);

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
    </>
  );
};

export default PostDetail;
