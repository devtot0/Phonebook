import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "000-000-000" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
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
        id: persons.length + 1
      };

      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleNameFiltering = (event) => setNameFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={nameFilter} onChange={handleNameFiltering}/>
      </div>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
      {persons.filter((person) => person.name.includes(nameFilter)).map((person) => (
        <div>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
