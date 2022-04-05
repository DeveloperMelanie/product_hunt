import { useState } from 'react'
import Router from 'next/router'
import form from 'ui/form'
import useValidation from 'hooks/useValidation'
import validateCreateAccount from 'validation/validateCreateAccount'
import firebase from '../firebase/index'

const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
}

export default function CreateAccount() {
    const [error, setError] = useState(null)

    const { values, errors, handleChange, handleBlur, handleSubmit } =
        useValidation(INITIAL_STATE, validateCreateAccount, createAccount)

    const { name, email, password } = values

    async function createAccount() {
        try {
            await firebase.register(name, email, password)
            Router.push('/')
        } catch (error) {
            console.error('Hubo un error al crear la cuenta.\n', error.message)
            setError(error.message)
        }
    }

    return (
        <>
            <h1>Crear cuenta</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label htmlFor='name'>Nombre</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Tu nombre'
                        value={name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>
                {errors.name && <p className='error'>{errors.name}</p>}
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Tu email'
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>
                {errors.email && <p className='error'>{errors.email}</p>}
                <div>
                    <label htmlFor='password'>Contraseña</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Tu contraseña'
                        value={password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>
                {errors.password && <p className='error'>{errors.password}</p>}

                {error && <p className='error'>{error}</p>}

                <input type='submit' value='Crear cuenta' />
            </form>

            <style jsx>{`
                h1 {
                    text-align: center;
                    margin-top: 5rem;
                }
            `}</style>
            <style jsx>{form}</style>
        </>
    )
}
