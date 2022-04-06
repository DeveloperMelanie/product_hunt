import css from 'styled-jsx/css'

export default css`
    header {
        border-bottom: 2px solid var(--gray-lighter);
        padding: 2rem 0;
    }

    .header-container {
        max-width: 1200px;
        width: 95%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    @media (min-width: 768px) {
        .header-container {
            flex-direction: row;
            justify-content: space-between;
        }
    }

    .logo {
        color: var(--orange);
        font-size: 4rem;
        line-height: 0;
        font-weight: 700;
        font-family: 'Roboto Slab', serif;
        margin: 0;
    }

    .header-container > div {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        row-gap: 2rem;
    }

    @media (min-width: 768px) {
        .header-container > div {
            margin-right: 1rem;
        }
    }

    .header-container a {
        margin-right: 2rem;
    }

    .user {
        margin-right: 2rem;
    }

    a {
        display: flex;
        margin-right: 2rem;
    }

    a:last-of-type {
        margin-right: 0;
    }
`
