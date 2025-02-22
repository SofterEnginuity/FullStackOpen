import axios from 'axios'

const baseUrl = 'http://localhost:3002/persons'

// Fetch all contacts
const getAll = () => axios.get(baseUrl).then(response => response.data)

// Add a new contact
const create = (newContact) => axios.post(baseUrl, newContact).then(response => response.data)

// Update an existing contact's number (PUT request)
const update = (id, updatedContact) => 
  axios.put(`${baseUrl}/${id}`, updatedContact).then(response => response.data)

// Delete a contact
const remove = (id) => 
  axios.delete(`${baseUrl}/${id}`)
    .then(() => console.log(`Deleted contact with id: ${id}`))
    .catch(error => {
      console.error("Error deleting contact:", error)
      throw error
    })

export default { getAll, create, update, remove }
