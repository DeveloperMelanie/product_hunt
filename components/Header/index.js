import Link from 'next/link'
import useFirebase from 'hooks/useFirebase'

import Search from '../Search'
import Navigation from '../Navigation'
import Button from '../Button'

import style from './style'

export default function Header() {
    const { user, firebase } = useFirebase()

    return (
        <header>
            <div className='header-container'>
                <div>
                    <Link href='/'>
                        <a>
                            <p className='logo'>P</p>
                        </a>
                    </Link>
                    <Search />
                    <Navigation />
                </div>

                <div>
                    {user ? (
                        <>
                            <p className='user'>Hola: {user.displayName}</p>
                            <Button bgColor onClick={() => firebase.logout()}>
                                Cerrar Sesión
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href='/iniciar-sesion'>
                                <a>
                                    <Button bgColor>Iniciar sesión</Button>
                                </a>
                            </Link>
                            <Link href='/crear-cuenta'>
                                <a>
                                    <Button>Registrarse</Button>
                                </a>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <style jsx>{style}</style>
        </header>
    )
}
