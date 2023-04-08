import {useEffect} from "react";
import {setWindowTitle} from "../utilities/website";
import {DISTANCE_VECTOR_ALGORITHM_PAGE} from "../constants/pages";

function DistanceVectorAlgorithm() {
    useEffect(() => {
        setWindowTitle(DISTANCE_VECTOR_ALGORITHM_PAGE)
    });

    return (
        <>
        </>
    )
}

export default DistanceVectorAlgorithm;
