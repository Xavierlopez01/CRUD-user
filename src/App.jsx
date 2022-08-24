import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import UsersList from './components/UsersList'

function App() {

  const [users, setUsers] = useState()
  const [updateUser, setUpdateUser] = useState()
  const [isFormOpen, setIsFormOpen] = useState(false)
  

  const getAllUser = () => {
    const URL = 'https://users-crud1.herokuapp.com/users/'
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getAllUser()
  }, [])

const handleOpenForm = () => setIsFormOpen(true)

const handleCloseForm = () => setIsFormOpen(false)


  return (
    <div className="App">
      <h1>CRUDS y metodos HTTP</h1>
      <div className='btn-container'>
        <h2 className='btn__title'>Users</h2>
      <button className='btn__user' onClick={handleOpenForm}><span className='btn__span'>+ </span>Create New User</button>
      </div>
      <div className={isFormOpen ? 'form-container' : 'form-none'}>
      <Form 
      getAllUser={getAllUser}
      updateUser={updateUser}
      setUpdateUser={setUpdateUser}
      handleCloseForm={handleCloseForm}
      />
      </div>
      <div className='card-container'>
        {
          users?.map(user => (
            <UsersList
              key={user.id}
              user={user}
              getAllUser={getAllUser}
              setUpdateUser={setUpdateUser}
              setIsFormOpen={setIsFormOpen}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
