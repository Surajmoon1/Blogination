import React, { useEffect, useState } from "react";
import { Button, Container, Loading } from "../components";
import appwriteService from "../appwriteServices/postsAndFileService";
import parse from "html-react-parser";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { slug } = useParams();

  const [loading, setLoading] = useState(false);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    setLoading(true);
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
        setLoading(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    setLoading(true);
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
        setLoading(false);
      }
    });
    setLoading(false);
  };

  return loading ? (
    <Loading />
  ) : post ? (
    <div className="py-8 mx-2 border">
      <Container>
        <div className=" w-full h-80 md:h-[35rem] relative justify-center mb-4 border-b rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl object-fill h-full w-full"
          />
          {isAuthor && (
            <div className="absolute  top-[-10px] right-2 z-0">
              <Link to={`/edit-post/${post.$id}`}>
                <Button class="mr-3 bg-green-500 px-7 py-1 rounded-xl font-bold hover:text-white hover:bg-green-800 ease-in duration-300">
                  Edit
                </Button>
              </Link>
              <button
                class="rounded-xl px-5 py-1 font-bold duration-300 ease-in  bg-red-500 hover:bg-red-800 hover:text-white"
                onClick={deletePost}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="w-full mb-6 ">
          <h1 className="text-4xl text-white font-bold text-center">
            {post.title}
          </h1>
        </div>
        <div className=" text-white px-4 py-10 border-y mb-4">
          {parse(post.content)}
        </div>
        <div className="text-end ">
          <p className="text-gray-300 font-bold pt-1">
            Author : &nbsp; {post.author}
          </p>
          <p className="text-gray-300 pt-1">Updated At - {post.updatedAt}</p>
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
