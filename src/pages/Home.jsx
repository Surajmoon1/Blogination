import React, { useEffect, useState } from "react";
import { PostCard, Container, Login, Loading } from "../components";
import appwriteService from "../appwriteServices/postsAndFileService";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    setLoading(true);
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  if (authStatus === false) {
    return (
      <div className="py-8">
        <Login />
      </div>
    );
  }

  if (posts.length === 0 && authStatus === true) {
    return loading ? (
      <Loading />
    ) : (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold py-10 text-center text-white hover:text-gray-500">
                No Posts yet
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
