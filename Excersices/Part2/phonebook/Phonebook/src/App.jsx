import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({ message: null, type: "" });


  // Fetch contacts when the page loads
  useEffect(() => {
    axios.get("http://localhost:3002/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  // Show notification for 3 seconds
  const showNotification = (message, type) => {
    setNotification({ message, type }); // Store message & type
    setTimeout(() => {
      setNotification({ message: null, type: "" }); // Reset after 3 sec
    }, 3000);
  };
  

  // Handle adding a person
  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Replace the old number with the new one?`
      );

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        phonebookService.update(existingPerson.id, updatedPerson).then((returnedPerson) => {
          setPersons(persons.map((person) => (person.id !== existingPerson.id ? person : returnedPerson)));
          setNewName("");
          setNewNumber("");
          showNotification(`Updated ${returnedPerson.name}`);
        });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      phonebookService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        showNotification(`Added ${returnedPerson.name}`);
      });
    }
  };

  // Handle deleting a person
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService.remove(id)
  .then(() => {
    setPersons(persons.filter((person) => person.id !== id));
    showNotification(`Deleted ${name}`, "success");
  })
  .catch((error) => {
    showNotification(`Error: ${name} was already removed from the server`, "error");
    setPersons(persons.filter((person) => person.id !== id)); // Remove it from UI too
  });

    }
  };

  // Filter contacts based on search input
  const filteredPersons = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.number.includes(searchTerm)
  );

  return (
    <div>
      <h2>Phonebook</h2>

      {notification.message && (
  <div
    style={{
      backgroundColor: notification.type === "error" ? "lightcoral" : "lightblue",
      padding: "10px",
      border: notification.type === "error" ? "1px solid red" : "1px solid blue",
      color: notification.type === "error" ? "darkred" : "darkblue",
      marginBottom: "10px",
    }}
  >
    {notification.message}
  </div>
)}

      <input
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <button type="submit">Add</button>
      </form>

      <h3>Numbers</h3>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  notification: {
    backgroundColor: "lightblue",
    padding: "10px",
    border: "1px solid blue",
    color: "darkblue",
    marginBottom: "10px",
  },
};

export default App;
