import React from "react";

const Landing = () => {
  function handleClick() {
    import("../Utils/add").then((module) => {
      const add = module.default;

      console.log(add(2, 2));
    });
  }

  return (
    <div>
      Landing
      <button onClick={handleClick}>2 + 2</button>
    </div>
  );
};

export default Landing;
