import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('');


  // Fetch contacts when the page loads
  useEffect(() => {
    phonebookService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  // Handle adding a person
  const addPerson = (event) => {
    event.preventDefault()

    // Check if person already exists
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      // Ask user for confirmation before updating the number
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Replace the old number with the new one?`
      )

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        phonebookService.update(existingPerson.id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      // Add new person
      const newPerson = { name: newName, number: newNumber }

      phonebookService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.number.includes(searchTerm)
  );
  
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id)) // Update state
        })
        .catch(error => {
          alert("Failed to delete contact!") // Show an error message
          console.error("Delete error:", error) // Log error for debugging
        })
    }
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
      <input 
        type="text" 
        placeholder="Search contacts..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />

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
  {filteredPersons.map(person => (
    <li key={person.id}>
      {person.name} - {person.number}
      <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
    </li>
  ))}
</ul>


    </div>
  )
}

export default App