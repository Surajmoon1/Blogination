import React, { useState, useEffect } from "react";
import { PostForm, Container, Loading } from "../components";
import appwriteService from "../appwriteServices/postsAndFileService";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          setLoading(false);
        }
      });
    } else {
      navigate("/");
    }
    setLoading(false)
  }, [slug, navigate]);

  return loading ? (
    <Loading />
  ) : post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
