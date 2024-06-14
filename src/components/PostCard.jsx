import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwriteServices/postsAndFileService";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full rounded-xl hover:bg-gray-900 p-3 hover:scale-105 ease-in duration-200">
        <div className="w-full mb-3 flex justify-center">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="object-contain rounded-xl"
          />
        </div>
        <h2 className=" text-xl text-center font-bold text-white">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
