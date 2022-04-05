import { useContext } from 'react'
import { FirebaseContext } from '../firebase/index'

export default function useFirebase() {
    return useContext(FirebaseContext)
}
