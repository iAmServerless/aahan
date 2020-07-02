export default function Header() {
    return (
        <>
        <style jsx>{`
            .headerStyle {
                background: url(/images/heroimages/aahan_hero.jpg);
                background-size: cover;
                background-position: center;
                display: grid;
                padding: 4rem 2rem;
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                align-items: center;
                min-height: 500px;
            }
            .title {
                color: #ddd;
                line-height: 4rem;
                text-align: center;
                width:500px;
                backdrop-filter: brightness(60%);
                padding: 50px;
                font-size: 3rem;
            }
            .subTitle {
                font-size: 1rem;
                line-height: 2rem;
            }
            @media (max-width: 719px){ 
                .title {
                    width: 100%;
                }
            }
        `}</style>
        <div className='headerStyle'>
            <div className='title'>
                <div>Hello!</div>
                <div>My Name is</div>
                <div>Aahan Sharma</div>
                <div className='subTitle'>I do what I do</div>
            </div>
        </div>
        </>
    )
}