import { useRouter } from 'next/router'
import form from 'ui/form'
import useValidation from 'hooks/useValidation'
import validateCreateProduct from 'validation/validateCreateProduct'
import useFirebase from 'hooks/useFirebase'

import NotFound from 'components/404'

const INITIAL_STATE = {
    name: '',
    enterprise: '',
    image: '',
    url: '',
    description: '',
}

export default function NewProduct() {
    const { values, errors, handleChange, handleBlur, handleSubmit } =
        useValidation(INITIAL_STATE, validateCreateProduct, createProduct)

    const { name, enterprise, image, url, description } = values

    const router = useRouter()
    const { user, firebase } = useFirebase()

    async function createProduct() {
        if (!user) {
            return router.push('/iniciar-sesion')
        }

        const product = {
            name,
            enterprise,
            image,
            url,
            description,
            votes: 0,
            comments: [],
            creator: {
                id: user.uid,
                name: user.displayName,
            },
            voted: [],
            createdAt: Date.now(),
        }

        await firebase.createProduct(product)
        router.push('/')
    }

    if (!user) return <NotFound />

    return (
        <>
            <h1>Nuevo Producto</h1>
            <form onSubmit={handleSubmit} noValidate>
                <fieldset>
                    <legend>Información General</legend>
                    <div>
                        <label htmlFor='name'>Nombre</label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            placeholder='Nombre del producto'
                            value={name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.name && <p className='error'>{errors.name}</p>}
                    <div>
                        <label htmlFor='name'>Empresa</label>
                        <input
                            type='text'
                            name='enterprise'
                            id='enterprise'
                            placeholder='Nombre de la empresa o compañía'
                            value={enterprise}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.enterprise && (
                        <p className='error'>{errors.enterprise}</p>
                    )}
                    <div>
                        <label htmlFor='image'>Imagen</label>
                        <input
                            type='file'
                            accept='image/*'
                            name='image'
                            id='image'
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <div className='file-c'>
                            <button
                                type='button'
                                onClick={() =>
                                    document.getElementById('image').click()
                                }
                            >
                                Elegir archivo
                            </button>
                            {image?.name && (
                                <p className='info'>{image.name}</p>
                            )}
                        </div>
                    </div>
                    {errors.image && <p className='error'>{errors.image}</p>}
                    <div>
                        <label htmlFor='url'>URL</label>
                        <input
                            type='text'
                            name='url'
                            id='url'
                            placeholder='https://tu-url.com'
                            value={url}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.url && <p className='error'>{errors.url}</p>}
                </fieldset>
                <fieldset>
                    <legend>Sobre tu producto</legend>
                    <div>
                        <label htmlFor='description'>Descripción</label>
                        <textarea
                            type='text'
                            name='description'
                            id='description'
                            value={description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.description && (
                        <p className='error'>{errors.description}</p>
                    )}
                </fieldset>

                <input type='submit' value='Crear Producto' />
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
