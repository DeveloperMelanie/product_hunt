export default function Button({ bgColor, href, width, children, ...props }) {
    return (
        <>
            {href ? (
                <a href={href} {...props}>
                    {children}
                </a>
            ) : (
                <button type='button' {...props}>
                    {children}
                </button>
            )}

            <style jsx>{`
                button,
                a {
                    all: unset;
                    display: block;
                    width: ${width || 'auto'};
                    font-weight: 700;
                    text-transform: uppercase;
                    border: 1px solid #d1d1d1;
                    padding: 0.8rem 2rem;
                    margin: 2rem auto;
                    text-align: center;
                    background-color: ${bgColor ? '#DA552F' : 'white'};
                    color: ${bgColor ? 'white' : '#000'};
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}
