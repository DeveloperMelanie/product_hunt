import useProducts from 'hooks/useProducts'

import ProductDetails from 'components/ProductDetails'

export default function Populars() {
    const { products } = useProducts('votes')

    return (
        <div className='products-list'>
            <div className='container'>
                <ul className='bg-white'>
                    {products.map(product => (
                        <ProductDetails key={product.id} product={product} />
                    ))}
                </ul>
            </div>
        </div>
    )
}
