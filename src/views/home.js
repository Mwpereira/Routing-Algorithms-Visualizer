import {useEffect} from "react";
import {setWindowTitle} from "../utilities/website";
import {HOME_PAGE} from "../constants/pages";

function Home() {
    useEffect(() => {
        setWindowTitle(HOME_PAGE)
    });

    return (
        <>
            <h1 className={'title has-text-centered mt-6'}>Welcome!</h1>
            <section>

            </section>
        </>
    )
}

export default Home;
