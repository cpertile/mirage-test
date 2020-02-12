import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  /* Creating state for user list and user form */
  const [users, setUsers] = useState([]);
  const [newUserForm, setNewUserForm] = useState({
    first_name: '',
    last_name: '',
    email: ''
  })

  /* The function that loads from the real api */
  async function getData() {
    axios.get('https://my.api.mockaroo.com/mockaroo.json?key=51425750')
      .then(res => setUsers(res.data.users))
      .catch(error => console.log(error.response.data.error))
  }

  /* NewUserForm handling functions */
  function handleChange(event) {
    setNewUserForm({
      ...newUserForm,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('/users', newUserForm)
      .then((res) => {
        getData();
        setNewUserForm({
          first_name: '',
          last_name: '',
          email: ''
        })
      })
  }

  useEffect(() => {
    getData();
    return (() => {
      setUsers([])
    })
  }, [])

  return (
    <>
      <form data-testid='new-user-form' onSubmit={handleSubmit}>
        <label htmlFor='first_name'>First Name</label>
        <br />
        <input type='text' name='first_name' value={newUserForm.first_name} onChange={handleChange} />
        <br />
        <label htmlFor='last_name'>Last Name</label>
        <br />
        <input type='text' name='last_name' value={newUserForm.last_name} onChange={handleChange} />
        <br />
        <label htmlFor='email'>Email</label>
        <br />
        <input type='text' name='email' value={newUserForm.email} onChange={handleChange} />
        <br />
        <button type='submit'>Create User</button>
      </form>
      <hr></hr>
      <ul data-testid='list'>
        {users.map(user => (
          <li key={user.id} data-testid='list-item'>
            <input type='text' name='first_name' defaultValue={user.first_name} />
            <input type='text' name='last_name' defaultValue={user.last_name} />
            <input type='text' name='email' defaultValue={user.email} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
