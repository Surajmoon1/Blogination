import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwriteServices/postsAndFileService";

function PostCard({ $id, title, featuredImage, author, updatedAt }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full rounded-xl bg-gray-900 p-2 hover:scale-105 ease-in duration-200">
        <div className="w-full mb-3 flex justify-center h-36">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="object-fill w-full rounded-xl"
          />
        </div>
        <h2 className=" text-xl text-center font-bold text-white">{title}</h2>
        <div className="flex justify-between items-center border-t border-gray-400 w-full">
          <p className="text-xs text-gray-400">
            Author: <span className="text-gray-300 text-base">{author}</span>
          </p>
          <span className="text-xs text-gray-400">{updatedAt}</span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
