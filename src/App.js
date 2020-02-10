import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [users, setUsers] = useState([]);

  /* It's possible to use 'fetch' or 'axios' */

  // useEffect(() => {
  //   fetch('https://my.api.mockaroo.com/mockaroo.json?key=51425750')
  //     .then(res => res.json())
  //     .then(json => setUsers(json.users))
  // }, [])

  useEffect(() => {
    axios.get('https://my.api.mockaroo.com/mockaroo.json?key=51425750')
    .then(res => setUsers(res.data.users))
  },[])

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.first_name + ' ' + user.last_name + ' - ' + user.email}
        </li>
      ))}
    </ul>
  );
}

export default App;
