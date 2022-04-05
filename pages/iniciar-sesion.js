import { useState } from 'react'
import Router from 'next/router'
import form from 'ui/form'
import useValidation from 'hooks/useValidation'
import validateSignIn from 'validation/validateSignIn'
import firebase from '../firebase/index'

const INITIAL_STATE = {
    email: '',
    password: '',
}

export default function Login() {
    const [error, setError] = useState(null)

    const { values, errors, handleChange, handleBlur, handleSubmit } =
        useValidation(INITIAL_STATE, validateSignIn, signIn)

    const { email, password } = values

    async function signIn() {
        try {
            await firebase.login(email, password)
            Router.push('/')
        } catch (error) {
            console.error('Hubo un error al iniciar sesión.\n', error.message)
            setError(error.message)
        }
    }

    return (
        <>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} noValidate>
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

                <input type='submit' value='Iniciar Sesión' />
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
