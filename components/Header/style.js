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
    }

    @media (min-width: 768px) {
        .header-container {
            display: flex;
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
        align-items: center;
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
