import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import Loader from "../Components/Loader";
import PostListItem from "../Components/PostListItem";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const Post = () => {
  const [post, setPost] = useState(null);

  const { id } = useParams();

  const { data } = useFetch(`/posts/${id}`);

  const { info } = useSelector(({ user }) => user);

  useEffect(() => {
    if (data) setPost(data);
  }, [data]);

  async function handleCommentPost(e) {
    e.preventDefault();
    let text = e.target[0].value;

    if (!text) return toast("Comment is required!", { type: "error" });

    try {
      let { data } = await axios.post(`/posts/comment/${id}`, { text });

      setPost((op) => ({ ...op, comments: data }));

      e.target.reset();
    } catch (error) {}
  }

  async function handleDeleteComment(id) {
    try {
      let { data } = await axios.delete(`/posts/comment/${post._id}/${id}`);

      toast(data.msg, { type: "success" });

      setPost((op) => ({
        ...op,
        comments: op.comments.filter((c) => c._id !== id),
      }));
    } catch (error) {}
  }

  return !post ? (
    <Loader />
  ) : (
    <div className="container py-5">
      <Link to="/posts" className="btn btn-light border mb-3">
        Back to Posts
      </Link>

      <PostListItem post={post} />

      <form onSubmit={handleCommentPost}>
        <p className="text-bg-info py-1 fs-3 px-3">Leave a Comment...</p>
        <div>
          <textarea
            name="text"
            rows="5"
            className="form-control"
            placeholder="Comment the post"
          ></textarea>
          <button type="submit" className="btn btn-dark mt-3">
            Create
          </button>
        </div>
      </form>

      <div className="my-3 d-flex flex-column gap-3">
        {post.comments.map((comment) => {
          console.log(comment);
          return (
            <div
              className="p-3 border d-flex gap-3 align-items-center"
              key={comment._id}
            >
              <div className="text-center">
                <img src={comment.avatar} className="rounded-circle" alt="" />
                <h3 className="text-info mt-3">{comment.name}</h3>
              </div>
              <div className="flex-fill">
                <p>{comment.text}</p>
                <p>{comment.date}</p>
                {info && info.user._id === comment.user && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="btn btn-danger"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Post;
