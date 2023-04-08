import {useEffect} from "react";
import {setWindowTitle} from "../utilities/website";
import {DIJKSTRAS_ALGORITHM_PAGE} from "../constants/pages";

function DijkstrasAlgorithm() {
    useEffect(() => {
        setWindowTitle(DIJKSTRAS_ALGORITHM_PAGE)
    });

    return (
        <>
        </>
    )
}

export default DijkstrasAlgorithm;
