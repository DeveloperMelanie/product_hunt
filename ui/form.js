import css from 'styled-jsx/css'

export default css`
    form {
        max-width: 600px;
        width: 95%;
        margin: 5rem auto 0 auto;
    }

    fieldset {
        margin: 2rem 0;
        border: 1px solid #e1e1e1;
        font-size: 2rem;
        padding: 2rem;
    }

    form > div,
    form > fieldset > div {
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    form > div > label,
    form > fieldset > div > label {
        flex: 0 0 150px;
        font-size: 1.8rem;
    }

    input,
    textarea {
        flex: 1;
        padding: 1rem;
    }

    textarea {
        height: 400px;
    }

    input[type='file'] {
        display: none;
        padding: 0;
    }

    button {
        all: unset;
        display: block;
        width: 100%;
        font-weight: 700;
        text-transform: uppercase;
        border: 1px solid #d1d1d1;
        padding: 0.8rem 2rem;
        margin: 2rem 0;
        margin-right: 1rem;
        text-align: center;
        white-space: nowrap;
        cursor: pointer;
    }

    input[type='submit'] {
        background: var(--orange);
        width: 100%;
        padding: 1.5rem;
        text-align: center;
        color: #fff;
        font-size: 1.8rem;
        text-transform: uppercase;
        border: none;
        font-family: 'PT Sans', sans-serif;
        font-weight: 700;
        cursor: pointer;
    }

    .error {
        background: #b53737;
        padding: 1rem;
        font-family: 'PT Sans', sans-serif;
        font-weight: 700;
        font-size: 1.4rem;
        color: #fff;
        text-align: center;
        text-transform: uppercase;
        margin: 2rem 0;
    }

    .file-c {
        flex: 1;
    }

    .info {
        width: 100%;
        text-align: center;
        margin: 0;
    }

    @media (min-width: 768px) {
        .info {
            width: auto;
        }
    }
`
