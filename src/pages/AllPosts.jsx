import React, { useEffect, useState } from "react";
import appwriteService from "../appwriteServices/postsAndFileService";
import { Container, Loading, PostCard } from "../components";

function AllPosts() {
  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setLoading(true)
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false)
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                {/* {post} */}
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
