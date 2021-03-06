import css from 'styled-jsx/css'

export default css`
    li {
        padding: 4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e1e1e1;
        flex-direction: column;
    }

    a {
        font-size: 2rem;
        font-weight: bold;
        margin: 0;
        cursor: pointer;
    }

    .product-description {
        font-size: 1.6rem;
        margin: 0;
        color: #888;
    }

    .description {
        flex: unset;
        display: grid;
        grid-template-columns: 1fr;
        column-gap: 2rem;
        justify-items: center;
        text-align: center;
    }

    @media (min-width: 768px) {
        .description {
            grid-template-columns: 1fr 3fr;
        }
    }

    .comments {
        margin-top: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media (min-width: 440px) {
        li {
            flex-direction: row;
        }

        .description {
            flex: 0 1 600px;
            justify-items: unset;
            text-align: left;
        }

        .comments {
            justify-content: unset;
        }
    }

    .comments div {
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e1;
        padding: 0.3rem 1rem;
        margin-right: 2rem;
    }

    .comments div img {
        width: 2rem;
        margin-right: 2rem;
    }

    .comments div p {
        font-size: 1.6rem;
        margin-right: 1rem;
        font-weight: 700;
    }

    .comments div p:last-of-type {
        margin-right: 0;
    }

    .product-img {
        width: 200px;
    }

    .votes {
        flex: 0 0 auto;
        text-align: center;
        border: 1px solid #e1e1e1;
        padding: 1rem 3rem;
    }

    .votes div {
        font-size: 2rem;
    }

    .votes p {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }
`
