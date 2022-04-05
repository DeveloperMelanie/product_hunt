import { useState, useEffect } from 'react'
import {
    onSnapshot,
    query,
    collection,
    orderBy,
    getFirestore,
} from 'firebase/firestore'

export default function useProducts(order) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const unsuscribe = onSnapshot(
            query(
                collection(getFirestore(), 'products'),
                orderBy(order, 'desc')
            ),
            snapshot => {
                const products = []
                snapshot.forEach(doc => {
                    products.push({ id: doc.id, ...doc.data() })
                })
                setProducts(products)
            }
        )

        return () => unsuscribe()
    }, [])

    return { products }
}
