import React from "react";

const Person = ({ name, number, removeNameHandler }) => {
  return (
    <div>
      {name} {number} <button onClick={removeNameHandler} />
    </div>
  );
};

export default Person;
