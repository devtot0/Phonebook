import React from "react";

const Person = ({ singlePerson, removeNameHandler }) => {
  return (
    <div>
      {singlePerson.name} {singlePerson.number}{" "}
      <button onClick={() => removeNameHandler(singlePerson.id)}>delete</button>
    </div>
  );
};

export default Person;
