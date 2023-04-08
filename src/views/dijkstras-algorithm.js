import {useEffect} from "react";
import {setWindowTitle} from "../utilities/website";
import {DIJKSTRAS_ALGORITHM_PAGE} from "../constants/pages";
import DijkstrasAlgorithmCanvas from "../components/dijkstras-algorithm-canvas";

function DijkstrasAlgorithm() {
    useEffect(() => {
        setWindowTitle(DIJKSTRAS_ALGORITHM_PAGE)
    });

    return (
        <>
            <h1 className={'title has-text-centered mt-6'}>{DIJKSTRAS_ALGORITHM_PAGE}</h1>
            <section className={'is-flex is-justify-content-center container'}>
                <DijkstrasAlgorithmCanvas />
            </section>
        </>
    )
}

export default DijkstrasAlgorithm;
