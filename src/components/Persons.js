import React from "react";
import Person from "./Person";

const Persons = ({ personList, nameFilter, removeNameHandler }) => {
  return (
    <div>
      {personList
        .filter((person) => person.name.includes(nameFilter))
        .map((person) => (
          <Person
            key={person.id}
            singlePerson={person}
            removeNameHandler={removeNameHandler}
          />
        ))}
    </div>
  );
};

export default Persons;
