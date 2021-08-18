import axios from "axios";
import React, { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "000-000-000", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const namesListReducer = (accumulator, currentValue) =>
    accumulator.concat(currentValue.name);

  const addNewName = (event) => {
    event.preventDefault();

    const namesList = persons.reduce(namesListReducer, []);

    if (namesList.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      axios
        .post("http://localhost:3001/persons", personObject)
        .then((response) => {
          console.log(response);
          setPersons(persons.concat(personObject));
          setNewName("");
          setNewNumber("");
        });
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleNameFiltering = (event) => setNameFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilter} onChange={handleNameFiltering} />
      <Form
        onSubmit={addNewName}
        nameValue={newName}
        numberValue={newNumber}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumberChange}
      />

      <h2>Numbers</h2>
      <div>debug: {newName}</div>
      <Persons personList={persons} nameFilter={nameFilter} />
    </div>
  );
};

export default App;
