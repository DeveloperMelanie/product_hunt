import { useState } from 'react'
import Router from 'next/router'

export default function Search() {
    const [query, setQuery] = useState('')

    const handleSubmit = e => {
        e.preventDefault()

        if (query.trim()) {
            Router.push({
                pathname: '/buscar',
                query: { q: query },
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Buscar Productos'
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button type='submit'>Buscar</button>

            <style jsx>{`
                form {
                    position: relative;
                }

                input {
                    border: 1px solid var(--gray-lighter);
                    padding: 1rem;
                    min-width: 300px;
                }

                button {
                    height: 3rem;
                    width: 3rem;
                    display: block;
                    background: #fff;
                    background-size: 4rem;
                    background-image: url(/static/img/search.png);
                    background-repeat: no-repeat;
                    background-position: center;
                    position: absolute;
                    right: 1rem;
                    transform: translateY(-50%);
                    top: 50%;
                    border: none;
                    cursor: pointer;
                    text-indent: -9999px;
                }
            `}</style>
        </form>
    )
}
