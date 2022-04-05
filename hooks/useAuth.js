import { useState, useEffect } from 'react'
import firebase from '../firebase/index'

export default function useAuth() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            setUser(user)
        })

        return () => unsubscribe()
    }, [])

    return user
}
