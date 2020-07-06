import {useRef, useEffect, memo} from 'react';

let headerImages = [
    '/photos/Aahan_hiding_behind_tree_in_a_park.jpg',
    '/photos/Aahan_sharma_that_pose.jpeg'
]

function Header() {
    let ref = useRef(null);
    let index = 0 ;
    useEffect(() => {
        let interval = setInterval(() => {
            if(index == headerImages.length) index=0;
            ref.current.style.backgroundImage=`url(${headerImages[index++]})`
        }, 5000);
        return () => {
            clearInterval(interval);
        }
    }, [])
    return (
        <>
        <style jsx>{`
            .headerStyle {
                background: url(/photos/Aahan_hiding_behind_tree_in_a_park.jpg);
                background-size: cover;
                background-position: center;
                display: grid;
                padding: 4rem 2rem;
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                align-items: center;
                min-height: 400px;
                width:100%;
                transition: background-image 1s ease-in-out;
            }
            .title {
                color: #ddd;
                animation: circle 16s infinite;
                line-height: 4rem;
                text-align: center;
                width:500px;
                backdrop-filter: brightness(60%);
                padding: 50px;
                font-size: 3rem;
                font-weight: 400;
                -webkit-font-smoothing: antialiased;
            }
            @keyframes circle {
                0% { clip-path: inset(0); }
                12.5% { clip-path: inset(0 0 100% 0); }
                25% { clip-path: inset(0) }
                37.5% { clip-path: inset(100% 0 0 0); }
                50% { clip-path: inset(0) }
                62.5% { clip-path: inset(0 100% 0 0); }
                75% { clip-path: inset(0); }
                87.5% { clip-path: inset(0 0 0 100%); }
                100% { clip-path: inset(0); }
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
        <div className='headerStyle' ref={ref}>
            <h1 className='title'>
                <div>Hello!</div>
                <div>My Name is</div>
                <div>Aahan Sharma</div>
                <div className='subTitle'>I do what I do</div>
            </h1>
        </div>
        </>
    )
}

export default memo(Header)