import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [users, setUsers] = useState([]);

  /* 
  It's possible to use 'fetch' or 'axios',
  using axios here because the response is easier to manipulate
   */

  // useEffect(() => {
  //   fetch('https://my.api.mockaroo.com/mockaroo.json?key=51425750')
  //     .then(res => res.json())
  //     .then(json => setUsers(json.users))
  // }, [])

  useEffect(() => {
    async function getData() {
      axios.get('https://my.api.mockaroo.com/mockaroo.json?key=51425750')
        .then(res => setUsers(res.data.users))
        .catch(error => console.log(error.response.data.error))
    }
    getData();
    return (() => {
      setUsers([])
    })
  }, [])

  return (
    <ul data-testid='list'>
      {users.map(user => (
        <li key={user.id} data-testid='list-item'>
          {user.first_name + ' ' + user.last_name + ' - ' + user.email}
        </li>
      ))}
    </ul>
  );
}

export default App;
