import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import PostForm from "../Components/PostForm";
import PostListItem from "../Components/PostListItem";
import useFetch from "../Hooks/useFetch";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { data } = useFetch("/posts");

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  function newPost(post) {
    setPosts((op) => [post, ...op]);
  }

  function deletePost(id) {
    setPosts((op) => op.filter((p) => p._id !== id));
  }

  return (
    <div className="container py-5">
      <h1 className="text-info display-1">Posts</h1>
      <p className="fs-2">
        See what are others up to or say what you are up to...
      </p>

      <PostForm newPost={newPost} />

      {!data ? (
        <Loader />
      ) : (
        <div className="d-flex flex-column gap-3">
          {posts.map((post) => {
            return (
              <PostListItem
                deletePost={deletePost}
                post={post}
                key={post._id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Posts;
