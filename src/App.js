import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

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
      };
      console.log(persons.length);
      personService.create(personObject).then((response) => {
        console.log(response);
        console.log(personObject);
        personService.getAll().then((response) => setPersons(response.data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const removeName = (id) => {
    console.log(id);
    const personToRemove = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToRemove.name}?`)) {
      personService
        .remove(id)
        .then((response) => console.log(response))
        .catch((error) => window.alert("An error occured."));
    }
    console.log(persons.slice(persons.indexOf(personToRemove), 1));
    setPersons(
      persons.filter((person) => {
        return person.id !== id;
      })
    );
    console.log(persons);
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
      <Persons
        personList={persons}
        nameFilter={nameFilter}
        removeNameHandler={removeName}
      />
    </div>
  );
};

export default App;
