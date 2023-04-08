import { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "jquery-ui/ui/widgets/draggable";
import '../assets/styles/dijstras-canvas.css'

function DijkstrasAlgorithmCanvas() {
    const containerRef = useRef(null);
    const draggableRef = useRef(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (containerRef.current && draggableRef.current) {
            $(draggableRef.current).draggable({
                containment: containerRef.current,
            });
        }
    }, [containerRef, draggableRef]);

    const handleAddNodeClick = () => {
        setCount(count + 1);

        const newElement = $("<div>")
            .addClass("draggable-component")
            .addClass("circle")
            .css({
                position: "absolute",
                top: `50px`,
                left: `${(count + 1) * 100}px`,
            })
            .text(`${count}`);

        $(draggableRef.current).append(newElement);

        $(newElement).draggable({
            containment: containerRef.current,
        });
    };

    return (
        <div className={'is-flex is-flex-direction-column'}  style={{ width: "100%"}}>
            <section className={'box'} ref={containerRef} style={{ height: 600}}>
                <div ref={draggableRef} style={{ width: 50, height: 50 }}>
                    {/* Your draggable component content here */}
                </div>
            </section>
            <section className={'my-5 buttons is-grouped'}>
                <button className={'button'} onClick={handleAddNodeClick}>Add Node</button>
                <button className={'button'} onClick={handleAddNodeClick}>Add Edge</button>
                <button className={'button'} onClick={handleAddNodeClick}>Add Weight</button>
            </section>
        </div>
    );
}

export default DijkstrasAlgorithmCanvas;
