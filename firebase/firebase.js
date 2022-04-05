import { initializeApp } from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth'
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    getFirestore,
} from 'firebase/firestore'
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from 'firebase/storage'
import firebaseConfig from './config'

import generateId from 'helpers/generateId'

class Firebase {
    constructor() {
        initializeApp(firebaseConfig)
        this.auth = getAuth()
        this.db = getFirestore()
        this.storage = getStorage()
    }

    // Register a new user
    async register(name, email, password) {
        const newUser = await createUserWithEmailAndPassword(
            this.auth,
            email,
            password
        )
        return await updateProfile(newUser.user, { displayName: name })
    }

    // Login an existing user
    async login(email, password) {
        return await signInWithEmailAndPassword(this.auth, email, password)
    }

    // Logout the current user
    async logout() {
        return await this.auth.signOut()
    }

    // Create product
    async createProduct(product) {
        const { image } = product
        const imageRef = ref(
            this.storage,
            `products/${generateId()}_${image.name}`
        )
        await uploadBytes(imageRef, image)
        const imageURL = await getDownloadURL(imageRef)
        product.image = imageURL

        return await addDoc(collection(this.db, 'products'), product)
    }

    // Update votes of a product
    async updateProduct(id, votes, voted) {
        return await updateDoc(doc(collection(this.db, 'products'), id), {
            votes,
            voted,
        })
    }

    // Create comment
    async createComment(id, comments) {
        return await updateDoc(doc(collection(this.db, 'products'), id), {
            comments,
        })
    }

    // Delete product
    async deleteProduct(image, id) {
        deleteObject(ref(this.storage, image))
        return await deleteDoc(doc(collection(this.db, 'products'), id))
    }
}

const firebase = new Firebase()

export default firebase
