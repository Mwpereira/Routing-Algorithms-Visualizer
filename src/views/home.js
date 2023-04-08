import {useEffect} from "react";
import {setWindowTitle} from "../utilities/website";
import {HOME_PAGE} from "../constants/pages";

function Home() {
    useEffect(() => {
        setWindowTitle(HOME_PAGE)
    });

    return (
        <>
        </>
    )
}

export default Home;
