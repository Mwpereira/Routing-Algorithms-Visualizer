import {useEffect, useRef} from "react";
import {setWindowTitle} from "../utilities/website";
import {DIJKSTRAS_ALGORITHM_PAGE} from "../constants/pages";
import $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable';

function DijkstrasAlgorithm() {
    useEffect(() => {
        setWindowTitle(DIJKSTRAS_ALGORITHM_PAGE)
    });

    const draggableRef1 = useRef(null);
    const draggableRef2 = useRef(null);
    const draggableRef3 = useRef(null);

    useEffect(() => {
        $(draggableRef1.current).draggable({ containment: [600, 600, 900, 900] });
        $(draggableRef2.current).draggable({ containment: [600, 600, 900, 900] });
        $(draggableRef3.current).draggable({ containment: [600, 600, 900, 900] });
    }, []);

    return (
        <>
            <h1 className={'title has-text-centered mt-6'}>Dijkstra's Algorithm</h1>
            <section>
                <div
                    style={{
                        width: 900,
                        height: 900,
                        position: 'absolute',
                        left: '50%',
                        top: '80%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'gray',
                    }}
                >
                    <div ref={draggableRef1} className="draggable-component">
                        Component 1
                    </div>
                    <div ref={draggableRef2} className="draggable-component">
                        Component 2
                    </div>
                    <div ref={draggableRef3} className="draggable-component">
                        Component 3
                    </div>
                </div>
            </section>
        </>
    )
}

export default DijkstrasAlgorithm;
