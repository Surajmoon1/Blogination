import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Loading, PostCard } from "../components";
import appwriteService from "../appwriteServices/postsAndFileService";
import { Query } from "appwrite";

function MyPost() {
  const userData = useSelector((state) => state.auth.userData);

  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    appwriteService
      .getPosts([Query.equal("userId", userData.$id)])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          setLoading(false);
        }
      });
  }, []);

  if (posts.length === 0) {
    return loading ? (
      <Loading />
    ) : (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold py-10 text-center text-white">
                You haven't post anything yet.
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col md:flex-row flex-wrap w-full justify-center items-center">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-80">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default MyPost;
