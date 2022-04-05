import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { es } from 'date-fns/locale'
import Link from 'next/link'

import style from './style'

export default function ProductDetails({ product }) {
    const { id, comments, createdAt, description, image, name, votes } = product

    return (
        <li>
            <div className='description'>
                <div>
                    <img src={image} alt={name} className='product-img' />
                </div>
                <div>
                    <Link href={`/productos/${id}`}>
                        <a>{name}</a>
                    </Link>
                    <p className='product-description'>{description}</p>
                    <div className='comments'>
                        <div>
                            <img
                                src='/static/img/comment.png'
                                alt='Comentario'
                            />
                            <p>
                                {comments.length}{' '}
                                {comments.length === 1
                                    ? 'Comentario'
                                    : 'Comentarios'}
                            </p>
                        </div>
                    </div>
                    <p>
                        Publicado hace:{' '}
                        {formatDistanceToNow(new Date(createdAt), {
                            locale: es,
                        })}
                    </p>
                </div>
            </div>
            <div className='votes'>
                <div>&#9650;</div>
                <p>{votes}</p>
            </div>

            <style jsx>{style}</style>
        </li>
    )
}
