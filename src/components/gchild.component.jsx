import React, { useContext } from "react";

import sharedcontext from "./../../src/context";
const GChild = () => {
  const obj = {
    React: {
      post: "Updated from GC",
      author: "Svetlana khan",
    },
  };
  const [blog, setBlog] = useContext(sharedcontext);
  return (
    <>
      <h1>Reach Blog Deatils</h1>
      <p> Topic: {blog.React.post}</p>
      <p> Author: {blog.React.author}</p>
      <button onClick={() => setBlog(obj)}>Update</button>
    </>
  );
};
export default GChild;
