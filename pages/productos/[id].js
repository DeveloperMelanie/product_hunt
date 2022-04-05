import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useFirebase from 'hooks/useFirebase'
import { onSnapshot, doc, collection, getFirestore } from 'firebase/firestore'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { es } from 'date-fns/locale'
import Swal from 'sweetalert2'

import NotFound from 'components/404'
import Spinner from 'components/Spinner'
import Button from 'components/Button'

import form from 'ui/form'

export default function Product() {
    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)
    const [comment, setComment] = useState({})

    const {
        query: { id },
        push,
    } = useRouter()
    const { firebase, user } = useFirebase()

    useEffect(() => {
        if (id) {
            const unsuscribe = onSnapshot(
                doc(collection(getFirestore(), 'products'), id),
                snapshot => {
                    if (snapshot.exists()) {
                        setProduct(snapshot.data())
                    } else {
                        setError(true)
                    }
                }
            )

            return () => unsuscribe()
        }
    }, [id])

    const {
        comments,
        createdAt,
        description,
        enterprise,
        image,
        name,
        url,
        votes,
        creator,
        voted,
    } = product

    const handleVote = async () => {
        if (!user) {
            return push('/iniciar-sesion')
        }

        // Remove vote
        if (voted.includes(user.uid)) {
            const newTotalVotes = votes - 1
            const newVoted = voted.filter(id => id !== user.uid)

            setProduct({ ...product, votes: newTotalVotes, voted: newVoted })
            return await firebase.updateProduct(id, newTotalVotes, newVoted)
        }

        // Add vote
        const newTotalVotes = votes + 1
        const newVoted = [...voted, user.uid]

        setProduct({ ...product, votes: newTotalVotes, voted: newVoted })
        await firebase.updateProduct(id, newTotalVotes, newVoted)
    }

    const handleCommentChange = e => {
        setComment({ ...comment, [e.target.name]: e.target.value })
    }

    const handleComment = async e => {
        e.preventDefault()

        if (!user) {
            return push('/iniciar-sesion')
        }

        comment.creatorId = user.uid
        comment.creatorName = user.displayName

        const newComments = [...comments, comment]

        setProduct({ ...product, comments: newComments })
        await firebase.createComment(id, newComments)
    }

    const isCreator = id => {
        return creator.id === id
    }

    const canDelete = () => {
        if (!user) return false
        return creator.id === user.uid
    }

    const handleDeleteProduct = async () => {
        if (canDelete()) {
            const { value: confirm } = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'No podrás revertir esto',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DA552F',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar',
                cancelButtonText: 'Cancelar',
            })
            if (confirm) {
                firebase.deleteProduct(product.image, id)
                push('/')
            }
        } else {
            push('/iniciar-sesion')
        }
    }

    if (error) return <NotFound />

    if (Object.keys(product).length === 0) return <Spinner />

    return (
        <div className='container'>
            <h1>{name}</h1>
            <div className='product-container'>
                <div>
                    <p>
                        Publicado hace:{' '}
                        {formatDistanceToNow(new Date(createdAt), {
                            locale: es,
                        })}
                    </p>
                    <p>
                        Por: {creator.name} de {enterprise}
                    </p>
                    <img src={image} alt={name} className='product-img' />
                    <p>{description}</p>

                    {user && (
                        <>
                            <h2>Agrega un comentario</h2>
                            <form onSubmit={handleComment} className='no-style'>
                                <div>
                                    <input
                                        type='text'
                                        name='message'
                                        onChange={handleCommentChange}
                                    />
                                </div>
                                <input type='submit' value='Enviar' />
                            </form>
                        </>
                    )}

                    <h2 className='comments'>Comentarios</h2>
                    {comments.length === 0 && <p>Aún no hay comentarios</p>}
                    <ul>
                        {comments.map((comment, i) => (
                            <li key={i}>
                                <p>{comment.message}</p>
                                <p>
                                    Escrito por:{' '}
                                    <span>{comment.creatorName}</span>
                                </p>
                                {isCreator(comment.creatorId) && (
                                    <p className='creator'>Es el creador</p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <aside>
                    <Button
                        href={url}
                        target='_blank'
                        rel='noopener noreferrer'
                        bgColor
                    >
                        Visitar URL
                    </Button>
                    <div className='votes'>
                        <p>
                            {votes} {votes === 1 ? 'Voto' : 'Votos'}
                        </p>
                        {user && (
                            <Button width='100%' onClick={handleVote}>
                                {voted.includes(user.uid)
                                    ? 'Remover Voto'
                                    : 'Votar'}
                            </Button>
                        )}
                    </div>
                    {canDelete() && (
                        <>
                            <h3>Administración de tu producto:</h3>
                            <Button width='100%' onClick={handleDeleteProduct}>
                                Eliminar Producto
                            </Button>
                        </>
                    )}
                </aside>
            </div>

            <style jsx>{form}</style>
            <style jsx>{`
                h1 {
                    text-align: center;
                    margin-top: 5rem;
                }

                @media (min-width: 768px) {
                    .product-container {
                        display: grid;
                        grid-template-columns: 2fr 1fr;
                        column-gap: 2rem;
                    }
                }

                .comments {
                    margin: 2rem 0;
                }

                .votes {
                    margin-top: 5rem;
                    text-align: center;
                }

                li {
                    border: 1px solid #e1e1e1;
                    padding: 2rem;
                }

                li span {
                    font-weight: bold;
                }

                .creator {
                    padding: 0.5rem 2rem;
                    background: #da552f;
                    color: #fff;
                    text-transform: uppercase;
                    font-weight: bold;
                    display: inline-block;
                    text-align: center;
                }

                aside h3 {
                    margin-top: 4rem;
                    text-align: center;
                }
            `}</style>
        </div>
    )
}
