import axios from 'axios'
import React from 'react'

const UsersList = ({ user, getAllUser, setUpdateUser, setIsFormOpen }) => {

    const deleteUser = () => {
        const URL = `https://users-crud1.herokuapp.com/users/${user.id}/`
        axios.delete(URL)
            .then(res => {
                console.log(res.data)
                getAllUser()
            })
            .catch(err => console.log(err))
    }
        const handlerUpdateUser = () => {
            setUpdateUser(user)
            setIsFormOpen(user)
            getAllUser()
        }

    return (
        <article className='card'>
            <h1 className='card__title'>{user['first_name']} {user['last_name']}</h1>
            <hr className='card__hr' />
            <ul className='card__list'>
                <li className='card__item'>Email: <span className='card__span'>{user.email}</span></li>
                <li className='card__item'>Birthday: <span className='card__span'>{user.birthday}</span></li>
            </ul>
            <hr className='card__hr' />
            <div className='card__footer'>
                <button onClick={deleteUser} className='card__btn'><i className="fa-solid fa-trash-can"></i></button>
                <button onClick={handlerUpdateUser} className='card__btn'><i className="fa-solid fa-pencil"></i></button>
            </div>

        </article>
    )
}

export default UsersList