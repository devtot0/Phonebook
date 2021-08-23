import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import SuccessNotification from "./components/SuccessNotification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState(null);

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
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find(
          (person) => person.name === newName
        );
        console.log(personToUpdate);
        const updatedPerson = { ...personToUpdate, number: newNumber };
        console.log(updatedPerson);
        personService
          .update(personToUpdate.id, updatedPerson)
          .then((response) => {
            console.log(response.data);
            setPersons(
              persons.map((person) =>
                person.id !== response.data.id ? person : response.data
              )
            );
          });
        setConfirmationMessage(`Updated ${newName}`);
        setTimeout(() => {
          setConfirmationMessage(null);
        }, 5000);
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject).then((response) => {
        personService.getAll().then((response) => setPersons(response.data));
        setNewName("");
        setNewNumber("");
        setConfirmationMessage(`Added ${newName}`);
        setTimeout(() => {
          setConfirmationMessage(null);
        }, 5000);
      });
    }
  };

  const removeName = (id) => {
    const personToRemove = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToRemove.name}?`)) {
      personService
        .remove(id)
        .then((response) => console.log(response))
        .catch((error) => window.alert("An error occured."));
    }
    setPersons(
      persons.filter((person) => {
        return person.id !== id;
      })
    );
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleNameFiltering = (event) => setNameFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={confirmationMessage} />
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
