import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const PostForm = ({ newPost }) => {
  async function handleCreatePost(e) {
    e.preventDefault();
    let text = e.target[0].value;
    if (!text) return toast("Text is required!!!", { type: "error" });

    try {
      let { data } = await axios.post("/posts", { text });
      newPost(data);
      e.target.reset();
    } catch (error) {}
  }

  return (
    <div className="py-5">
      <form onSubmit={handleCreatePost}>
        <p className="text-bg-info py-1 fs-3 px-3">Say something...</p>
        <div>
          <textarea
            name="text"
            rows="5"
            className="form-control"
            placeholder="Create a post"
          ></textarea>
          <button type="submit" className="btn btn-dark mt-3">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
