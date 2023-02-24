import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const PostListItem = ({ post, deletePost }) => {
  const [postLikes, setPostLikes] = useState(post.likes.length);

  const { info } = useSelector(({ user }) => user);

  async function handleLikePost(id) {
    try {
      let { data } = await axios.put(`/posts/like/${id}`);
      console.log(data);
      setPostLikes((c) => c + 1);
    } catch (error) {
      toast(error?.response?.data?.msg, { type: "error" });
    }
  }

  async function handleDislikePost(id) {
    try {
      let { data } = await axios.put(`/posts/unlike/${id}`);
      console.log(data);
      setPostLikes((c) => c - 1);
    } catch (error) {
      toast(error?.response?.data?.msg, { type: "error" });
    }
  }

  async function handleDeletePost(id) {
    try {
      let { data } = await axios.delete(`/posts/${id}`);

      console.log(data);
      deletePost(id);
    } catch (error) {}
  }

  return (
    <div className="border px-5 py-3 d-flex gap-5 align-items-center">
      <div>
        <img className="rounded-circle mb-3" src={post.avatar} alt="" />
        <h3 className="text-center text-info">{post.name}</h3>
      </div>
      <div className="flex-fill">
        <h4>{post.text}</h4>
        <p>{post.date}</p>
        <div className="d-flex gap-3">
          <button
            onClick={() => handleLikePost(post._id)}
            className="px-4 border btn btn-light"
          >
            <i className="fa-solid fa-thumbs-up"></i>
            {postLikes > 0 && <span className="ps-2">({postLikes})</span>}
          </button>
          <button
            onClick={() => handleDislikePost(post._id)}
            className="px-4 border btn btn-light"
          >
            <i className="fa-solid fa-thumbs-down"></i>
          </button>
          <Link to={`/posts/${post._id}`} className="btn btn-info">
            Discussion
          </Link>
          {info && info.user._id === post.user && (
            <button
              onClick={() => handleDeletePost(post._id)}
              className="px-4 border btn btn-danger"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostListItem;
