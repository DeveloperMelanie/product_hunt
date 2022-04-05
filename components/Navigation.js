import useFirebase from 'hooks/useFirebase'
import Link from 'next/link'

export default function Navigation() {
    const { user } = useFirebase()

    return (
        <nav>
            <Link href='/'>
                <a>Inicio</a>
            </Link>
            <Link href='/populares'>
                <a>Populares</a>
            </Link>
            {user && (
                <Link href='/nuevo-producto'>
                    <a>Nuevo Producto</a>
                </Link>
            )}

            <style jsx>{`
                nav {
                    padding-left: 2rem;
                }

                a {
                    font-size: 1.8rem;
                    margin-left: 2rem;
                    color: var(--gray-light);
                    font-family: 'PT Sans', sans-serif;
                }
            `}</style>
        </nav>
    )
}
