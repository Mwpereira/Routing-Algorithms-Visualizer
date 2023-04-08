import {useEffect} from "react";
import {setWindowTitle} from "../utilities/website";
import {DISTANCE_VECTOR_ALGORITHM_PAGE} from "../constants/pages";

function DistanceVectorAlgorithm() {
    useEffect(() => {
        setWindowTitle(DISTANCE_VECTOR_ALGORITHM_PAGE)
    });

    return (
        <>
            <h1 className={'title has-text-centered mt-6'}>Distance Vector Algorithm</h1>
            <section>

            </section>
        </>
    )
}

export default DistanceVectorAlgorithm;
