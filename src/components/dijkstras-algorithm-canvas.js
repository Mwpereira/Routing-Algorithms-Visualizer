import {useState, useEffect, useRef, useCallback} from "react";
import $ from "jquery";
import "jquery-ui/ui/widgets/draggable";
import "../assets/styles/dijstras-canvas.css";
import {successToast, warningToast} from "../utilities/toast";

function getSelectedValue() {
    return $('input[name="toggleAction"]:checked').val();
}

function DijkstrasAlgorithmCanvas() {
    const containerRef = useRef(null);
    const draggableRef = useRef(null);
    const [letters, setLetters] = useState("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    const [usedLetters, setUsedLetters] = useState([]);
    const [selectedNodes, setSelectedNodes] = useState([]);

    useEffect(() => {
        if (containerRef.current && draggableRef.current) {
            $(draggableRef.current).draggable({
                containment: containerRef.current,
            });
        }
    }, [containerRef, draggableRef]);

    // Gets the next available letter to use for a node
    const getNextLetter = () => {
        for (let i = 0; i < letters.length; i++) {
            const letter = letters.charAt(i);
            if (!usedLetters.includes(letter)) {
                setUsedLetters((prevLetters) => [...prevLetters, letter]);
                return letter;
            }
        }
        return "";
    };

    // Handles the drag event for a node (updates the drawing of an edge if effected) -- ACTUALLY NO
    const handleNodeDrag = (event, ui) => {
        const node = ui.helper;
        const position = node.position();

        // Only log the final position when dragging is complete
        if (event.type === "dragstop") {
            console.log(`Node ${node.text()} final position: ${position.top}, ${position.left}`);
        }
    };

    const handleNodeClick = useCallback((selectedAction, node) => {
        setSelectedNodes((prevSelectedNodes) => {
            console.log(prevSelectedNodes + " " + node)
            if (prevSelectedNodes.includes(node)) {
                warningToast("Node already selected")
                return [];
            }
            if (selectedAction === "connectNodes") {
                if (prevSelectedNodes.length === 1) {
                    // Draw line between nodes
                    const start = $(`#${prevSelectedNodes[0]}`);
                    const end = $(`#${node}`);

                    const startOffset = start.offset();
                    const endOffset = end.offset();

                    const canvas = $("<canvas>").appendTo(containerRef.current);
                    const ctx = canvas[0].getContext("2d");
                    ctx.strokeStyle = "black";
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(startOffset.left - containerRef.current.offsetLeft + 25, startOffset.top - containerRef.current.offsetTop + 25);
                    ctx.lineTo(endOffset.left - containerRef.current.offsetLeft + 25, endOffset.top - containerRef.current.offsetTop + 25);
                    ctx.stroke();

                    successToast("Edge drawn successfully")
                    return [];
                } else {
                    return [...prevSelectedNodes, node];
                }
            } else {
                // Delete node/edge
                $(`#${node}`).remove(); // Remove selected node
                setUsedLetters((prevLetters) =>
                    prevLetters.filter((letter) => letter !== node)
                ); // Put the letter back to the alphabet array
                return [];
            }
        });
    }, []);

    const handleAddNodeClick = () => {
        const letter = getNextLetter()
        const newElement = $("<div>")
            .addClass("draggable-component")
            .addClass("circle")
            .attr("id", letter)
            .css({
                position: "absolute",
                top: `50px`,
                left: `100px`,
            })
            .text(`${letter}`)
            .click(() => handleNodeClick(getSelectedValue(), letter));

        $(draggableRef.current).append(newElement);

        $(newElement).draggable({
            containment: containerRef.current,
            stop: handleNodeDrag,
        });
    };

    return (
        <div className={'is-flex is-flex-direction-column'} style={{width: "100%"}}>
            <section className={'box'} ref={containerRef} style={{height: 600}}>
                <div ref={draggableRef} style={{width: 50, height: 50}}>
                    {/* draggable component content here */}
                </div>
            </section>
            <section className={'my-5'}>
                <label className={'label'}>Actions:</label>
                <div className={'is-flex is-justify-content-space-between'}>
                    <div className={'buttons is-grouped'}>
                        <button className={'button'} onClick={handleAddNodeClick}>Add Node</button>
                    </div>

                    <div className={'control'}>
                        <label className="radio mr-5">
                            <input
                                defaultChecked={true}
                                className={'mr-2'}
                                type="radio"
                                name="toggleAction"
                                value="connectNodes"
                            />
                            Connect Nodes (Draw Edge)
                        </label>
                        <label className="radio">
                            <input
                                className={'mr-2'}
                                type="radio"
                                name="toggleAction"
                                value="deleteNodeEdge"
                            />
                            Delete Node/Edge
                        </label>
                    </div>

                    <button className={'button is-primary'} onClick={handleAddNodeClick}>Calculate</button>
                </div>
            </section>
        </div>
    );
}

export default DijkstrasAlgorithmCanvas;
