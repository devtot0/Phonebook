import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ newName, setNewName ] = useState('');

  const namesListReducer = (accumulator, currentValue) => accumulator.concat(currentValue.name);

  const addNewName = (event) =>{
    event.preventDefault();
    console.log('button clicked');
    const namesList = persons.reduce(namesListReducer, []);
    console.log(namesList);
    if(namesList.includes(newName)){
      window.alert(`${newName} is already added to phonebook`);
    }else {
      const personObject = {
        name: newName
      };
      setPersons(persons.concat(personObject));
      setNewName('');
      console.log('new name added');
    }
  };

  const handleNameChange = (event) =>{
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
      {persons.map((person) => <div>{person.name}</div>)}
    </div>
  )
}

export default App;