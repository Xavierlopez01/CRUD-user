import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const defaultValue = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birthday: ''
}

const Form = ({ getAllUser, updateUser, setUpdateUser, handleCloseForm }) => {
    
    useEffect(() => {
    if(updateUser){
        reset(updateUser)
    }
    }, [updateUser])
    

    const createUser = data => {
        const URL = 'https://users-crud1.herokuapp.com/users/'
        axios.post(URL, data)
            .then(res => {
                console.log(res.data)
                getAllUser()
            })
            .catch(err => console.log(err))
    }

    const updateNewUser = data => {
        const URL = `https://users-crud1.herokuapp.com/users/${updateUser.id}/`
        axios.patch(URL, data)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))
        getAllUser()
    } 

    const { register, reset, handleSubmit } = useForm()

    const submit = data => {
        if(updateUser){
            updateNewUser(data)
            setUpdateUser()
        }else {
            createUser(data)
        }
        reset(defaultValue)
        handleCloseForm()
    }

    return (
        <article className='form-container'>
            <form onSubmit={handleSubmit(submit)} className='form'>
            <div onClick={handleCloseForm} className='form__x'><i className="fa-solid fa-xmark"></i></div>
                <h2 className='form__tilte'>{updateUser ? 'Update User': 'New User'}</h2>
                <ul className='form__list'>
                    <li className='form__item'>
                        <label htmlFor="first_name">First Name</label>
                        <input {...register("first_name")} type="text" id='first_name' />
                    </li>
                    <li className='form__item'>
                        <label htmlFor="last_name">Last Name</label>
                        <input {...register("last_name")} type="text" id='last_name' />
                    </li>
                    <li className='form__item'>
                        <label htmlFor="email">Email</label>
                        <input {...register("email")} type="email" id='email' />
                    </li>
                    <li className='form__item'>
                        <label htmlFor="password">Password</label>
                        <input {...register("password")} type="password" id='password' />
                    </li>
                    <li className='form__item'>
                        <label htmlFor="birthday">Password</label>
                        <input {...register("birthday")} type="date" id='birthday' />
                    </li>
                </ul>
                <button className='form__btn'>{updateUser ? 'Update' : 'Create'}</button>
            </form>
        </article>
    )
}

export default Form