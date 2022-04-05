import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useProducts from 'hooks/useProducts'
import normalizeStrings from 'normalize-strings'

import ProductDetails from 'components/ProductDetails'

export default function Buscar() {
    const {
        query: { q },
    } = useRouter()

    const { products } = useProducts('createdAt')
    const [filteredProducts, setFilteredProducts] = useState([])

    const normalizeString = str => normalizeStrings(str).toLowerCase()

    useEffect(() => {
        if (q) {
            const filteredProducts = products.filter(
                product =>
                    normalizeString(product.name).includes(
                        normalizeString(q)
                    ) ||
                    normalizeString(product.description).includes(
                        normalizeString(q)
                    )
            )
            setFilteredProducts(filteredProducts)
        }
    }, [q, products])

    return (
        <div className='products-list'>
            <div className='container'>
                <ul className='bg-white'>
                    {filteredProducts.map(product => (
                        <ProductDetails key={product.id} product={product} />
                    ))}
                </ul>
            </div>
        </div>
    )
}
