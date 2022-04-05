import Head from 'next/head'
import firebase, { FirebaseContext } from '../firebase/index'
import useAuth from 'hooks/useAuth'

import Header from 'components/Header'
import 'styles/globals.css'

export default function MyApp({ Component, pageProps }) {
    const user = useAuth()

    return (
        <FirebaseContext.Provider value={{ firebase, user }}>
            <Head>
                <title>Product Hunt</title>
            </Head>
            <Header />
            <main>
                <Component {...pageProps} />
            </main>
            <style jsx>{`
                main {
                    padding-bottom: 5rem;
                }
            `}</style>
        </FirebaseContext.Provider>
    )
}
