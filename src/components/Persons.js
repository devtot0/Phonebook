import React from "react";
import Person from "./Person";

const Persons = ({ personList, nameFilter }) => {
  return (
    <div>
      {personList
        .filter((person) => person.name.includes(nameFilter))
        .map((person) => (
          <Person name={person.name} number={person.number} />
        ))}
    </div>
  );
};

export default Persons;
