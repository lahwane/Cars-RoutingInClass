import { animateCSS } from "../services/util.service.js"

const { useRef } = React

export function Home() {

    const h1Ref = useRef()
    const imgRef = useRef()

    function onActivate() {
        animateCSS(h1Ref.current, 'rubberBand')
            .then(() => {
                animateCSS(imgRef.current, 'bounceOut', false)
            })
    }
    return (
        <section className="home">
            <button onClick={onActivate}>Activate</button>
            <h1 ref={h1Ref} >Car's R Us!</h1>
            <img ref={imgRef} src="../assets/img/react.png" alt="react" />
        </section>
    )
}