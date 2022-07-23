import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { timeParser } from './jajal'

import './App.css';
import './coba.css';

const URL_API = 'http://localhost:8080'
// const URL_API = 'http://192.168.207.15:8080'

const App = () => {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [updateId, setUpdateId] = useState('')
  const [textUpdate, setTextUpdate] = useState('')

  useEffect(() => {
    axios.get(URL_API)
      .then((response) => {
        console.log('response', response)
        setUsers(response.data.penggunas)
      })
      .catch((error) => console.log('rusak', error))
  }, [])

  const handleInput = (e) => {
    const value = e.target.value
    setName(value)
  }

  const handleButton = () => {
    axios.post(URL_API, {
      nama: name
    })
      .then((response) => {
        console.log('response', response)
        alert('Success')
        window.location.reload()
      })
      .catch((error) => {
        console.log('rusak', error)
        alert('Error')
      })
  }

  const handleUpdate = (id, value) => {
    if (id === updateId) {
      axios.put(URL_API + '/' + id, {
        nama: textUpdate
      })
        .then((response) => {
          console.log('response', response)
          alert('Success')
          window.location.reload()
        })
        .catch((error) => {
          console.log('rusak', error)
          alert('Error')
        })
    } else {
      setUpdateId(id)
      setTextUpdate(value)
    }
  }

  const handleTextUpdate = (e) => {
    const value = e.target.value
    setTextUpdate(value)
  }

  const handleDelete = (id) => {
    axios.delete(URL_API + '/' + id)
      .then((response) => {
        console.log('response', response)
        alert('Success')
        window.location.reload()
      })
      .catch((error) => {
        console.log('rusak', error)
        alert('Error')
      })
  }

  return (
    <div className="App">
      <div clasName="Form" >
        <input className="InputSubmit"
          value={name}
          onChange={handleInput}
        />
        <button
          onClick={handleButton}
        >
          Simpan
        </button>
      </div>
      <table>
        <tr>
          <th>No.</th>
          <th>Id</th>
          <th>Nama</th>
          <th>Waktu Dibuat</th>
          <th>Waktu Diperbarui</th>
          <th>Ubah</th>
          <th>Hapus</th>
        </tr>
        {users.map((user, index) => (
          <tr key={user._id}>
            <td>
              {index + 1}
            </td>
            <td>
              {user._id}
            </td>
            <td>
              {user._id === updateId 
                ? <input className="InputEdit" value={textUpdate} onChange={(handleTextUpdate)} />
                : user.name}
            </td>
            <td>
              {timeParser(user.created)}
            </td>
            <td>
              {timeParser(user.updated)}
            </td>
            <td>
              <button
                onClick={() => handleUpdate(user._id, user.name)}
              >
                {user._id === updateId ? 'Simpan' : 'Update'}
              </button>
            </td>
            <td>
              <button
                onClick={() => handleDelete(user._id)}
              >
                Hapus
              </button>
            </td>
        </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
