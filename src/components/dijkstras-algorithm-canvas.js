import React, {useEffect, useState} from "react";
import DraggableNode from "../components/draggable-node";
import Edge from "./edge";
import "../assets/styles/dijstras-canvas.css"
import {dismissToast, errorToast, infoToast, successToast} from "../utilities/toast";
import {dijkstraAlgorithm} from "../algorithms/dijkstra-algorithm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {faRefresh} from "@fortawesome/free-solid-svg-icons/faRefresh";


const DijkstrasAlgorithmCanvas = () => {
    // State for nodes in the graph with initial values
    const [nodes, setNodes] = useState([
        {id: "A", x: 150, y: 100},
        {id: "B", x: 400, y: 100},
        {id: "C", x: 250, y: 250},
    ]);

    // State for edges between nodes in the graph with initial values
    const [edges, setEdges] = useState([
        {endNodeId: "B", id: "AB", startNodeId: "A", weight: 10},
        {endNodeId: "C", id: "BC", startNodeId: "B", weight: 15},
    ]);

    // State for currently selected edge ID
    const [selectedEdgeId, setSelectedEdgeId] = useState(null);
    // State for currently selected nodes in the graph
    const [selectedNodes, setSelectedNodes] = useState([]);
    // State for the selected weight of the edge
    const [selectedWeight, setSelectedWeight] = useState(null);
    // State for the starting node
    const [startingNode, setStartingNode] = useState("A");
    // State for steps in the Dijkstra's algorithm
    const [currentStep, setCurrentStep] = useState(0);
    // State which stores the result of the Dijkstra's algorithm
    const [dijkstraResult, setDijkstraResult] = useState({});

    // Function to check if the graph is in edit mode
    const graphEditingMode = () => {
        return Object.keys(dijkstraResult).length === 0;
    }

    // Updates the position of a node in the graph
    const updateNodePosition = (nodeId, x, y) => {
        setNodes((prevNodes) =>
            prevNodes.map((node) => (node.id === nodeId ? {...node, x, y} : node))
        );
    };

    // Updates the weight of an edge in the graph
    const updateEdgeWeight = (edgeId, weight) => {
        setEdges((prevEdges) =>
            prevEdges.map((edge) =>
                edge.id === edgeId ? {...edge, weight} : edge
            )
        );
    };

    // Handles the selection of an edge
    const handleSelectEdge = (edgeId) => {
        if (graphEditingMode()) {
            if (selectedEdgeId === edgeId) {
                setSelectedEdgeId(null);
                setSelectedWeight(null);
            } else {
                setSelectedEdgeId(edgeId);
                const edge = edges.find((e) => e.id === edgeId);
                setSelectedWeight(edge.weight);
            }
        }
    };

    const selectEdge = (edgeId) => {
        const edge = edges.find((c) => c.id === edgeId || c.id === edgeId.split("").reverse().join(""))

        if (edge && !(selectedEdgeId === edge.id)) {
            setSelectedEdgeId(edge.id);
        }
    };

    // Handles the selection of a node in the graph
    const handleNodeClick = (nodeId, selected) => {
        if (graphEditingMode()) {
            if (selected) {
                setSelectedNodes((prevSelectedNodes) => [...prevSelectedNodes, nodeId]);
            } else {
                setSelectedNodes((prevSelectedNodes) =>
                    prevSelectedNodes.filter((id) => id !== nodeId)
                );
            }
        }
    };

    // Adds a new node to the graph
    const addNode = () => {
        const newNodeId = String.fromCharCode(
            Math.max(...nodes.map((node) => node.id.charCodeAt(0))) + 1
        );
        const newNode = {
            id: newNodeId,
            x: Math.floor(Math.random() * 750),
            y: Math.floor(Math.random() * 350),
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
    };

    // Connects two selected nodes in the graph
    const connectNodes = () => {
        if (selectedNodes.length === 2) {
            const newEdgeId = selectedNodes.join("");
            if (
                !edges.some(
                    (edge) =>
                        edge.id === newEdgeId ||
                        edge.id === newEdgeId.split("").reverse().join("")
                )
            ) {
                const newEdge = {
                    endNodeId: selectedNodes[1],
                    id: newEdgeId,
                    startNodeId: selectedNodes[0],
                    weight: 1,
                };
                setEdges((prevEdges) => [...prevEdges, newEdge]);
                setSelectedNodes([]);
            }
        }
    };

    const removeNode = (nodeId) => {
        // Remove node from nodes list
        setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));

        // Remove edges involving the node
        setEdges((prevEdges) =>
            prevEdges.filter(
                (edge) =>
                    edge.startNodeId !== nodeId && edge.endNodeId !== nodeId
            )
        );

        // Remove node from the selected nodes list
        setSelectedNodes((prevSelectedNodes) =>
            prevSelectedNodes.filter((id) => id !== nodeId)
        );
    };

    return (
        <div className={'is-flex is-flex-direction-column mb-6'}>
            <div className="box">
                <div className="DroppableArea">
                    <svg height="100%" width="100%">
                        {edges.map((edge) => {
                            const startNode = nodes.find((node) => node.id === edge.startNodeId);
                            const endNode = nodes.find((node) => node.id === edge.endNodeId);

                            return (
                                <Edge
                                    endNode={endNode}
                                    key={edge.id}
                                    onSelect={(e) => {
                                        e.stopPropagation();
                                        handleSelectEdge(edge.id);
                                    }}
                                    selected={selectedEdgeId === edge.id}
                                    startNode={startNode}
                                    weight={edge.weight}
                                />
                            );
                        })}
                    </svg>
                    {nodes.map((node) => (
                        <DraggableNode
                            key={node.id}
                            nodeId={node.id}
                            onClick={(selected) => {
                                handleNodeClick(node.id, selected);
                            }}
                            onDrag={(x, y) => {
                                updateNodePosition(node.id, x, y);
                            }}
                            onRemove={() => removeNode(node.id)}
                            selected={selectedNodes.includes(node.id)}
                            x={node.x}
                            y={node.y}
                            disableDragging={!graphEditingMode()}
                        />
                    ))}
                </div>
            </div>
            {graphEditingMode() && (
                <section>
                    <label className={'label'}>Graph Actions:</label>
                    <section className={'is-flex is-justify-content-space-between'}>
                        <div className={'buttons is-grouped'}>
                            <button className={'button'} onClick={addNode}>
                                Add Node
                            </button>
                            <button
                                className={'button'}
                                onClick={connectNodes}
                            >
                                Connect Nodes
                            </button>
                            <button
                                className={'button'}
                                onClick={() => {
                                    selectedNodes.forEach((nodeId) => removeNode(nodeId));
                                    setSelectedNodes([]);
                                }}
                            >
                                Delete Node
                            </button>
                        </div>
                    </section>
                    {selectedEdgeId && (
                        <div className={'column is-6 mt-2 pl-0 pb-0'}>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (selectedWeight !== null) {
                                        updateEdgeWeight(selectedEdgeId, selectedWeight);
                                    }
                                    setSelectedEdgeId(null); // Unselect the edge
                                }}
                            >
                                <label className={'label'}>
                                    Edge <span style={{color: '#f71a1a'}}>{selectedEdgeId}</span>:{" "}
                                    <input
                                        className={'input'}
                                        onChange={(e) => setSelectedWeight(parseInt(e.target.value))}
                                        type="number"
                                        value={selectedWeight}
                                    />
                                </label>
                                <button className={'button is-dark'} type="submit">Update Weight</button>
                            </form>
                        </div>
                    )}
                    <section className={'mt-5'}>
                        <label className={'label'}>Algorithm Actions:</label>
                        <div className={'is-flex is-justify-content-space-between is-align-items-center'}>
                    <span>
                    <p>Starting Node</p>
                    <div className="select">
                        <div className="select">
                            <select
                                id="starting-node"
                                onChange={(e) => setStartingNode(e.target.value)}
                                required={true}
                                value={startingNode}
                            >
                                <option disabled value="">Select starting node</option>
                                {nodes.map((node) => (
                                    <option key={node.id} value={node.id}>
                                        {node.id}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    </span>
                            <button
                                className={'button is-info'}
                                onClick={() => {
                                    if (nodes.length < 2) {
                                        errorToast('Please add at least two nodes');
                                        return;
                                    }

                                    if (!nodes.find((node) => node.id === startingNode)) {
                                        errorToast('Please select a starting node');
                                        return;
                                    }

                                    infoToast('Calculating...')
                                    console.log(edges)
                                    const result = dijkstraAlgorithm({edges, nodes}, startingNode);

                                    setDijkstraResult(result);

                                    dismissToast(2) // Remove the toast with the Assigned ID of 2 which is that of the infoToast

                                    successToast('Calculation complete!');
                                }}
                            >
                                Calculate
                            </button>
                        </div>
                    </section>
                </section>
            )}
            {!graphEditingMode() && (
                <div>
                    <h2 className={'title'}>Algorithm Steps</h2>
                    <h3 className={'subtitle is-size-4 mt-3 mb-5'}>Step {currentStep + 1} of {dijkstraResult.length}</h3>
                    <p className={'is-size-5 content is-inline-'}>{dijkstraResult[currentStep].text}</p>
                    <section>
                        <table className={'table'}>
                            <thead>
                            <tr>
                                <th>Node</th>
                                <th>Is Visited?</th>
                                <th>Distance</th>
                                <th>Previous Node</th>
                            </tr>
                            </thead>
                            <tbody>
                            {dijkstraResult[currentStep].table.map((_, index) => {
                                // Perform action within the map function
                                if (dijkstraResult[currentStep].table[3][index]) {
                                    selectEdge(dijkstraResult[currentStep].table[0][index] + dijkstraResult[currentStep].table[3][index]);
                                }

                                // Render the table row if the condition is met
                                return index !== dijkstraResult[currentStep].table[0].length ? (
                                    <tr key={index}>
                                        <td>{dijkstraResult[currentStep].table[0][index]}</td>
                                        <td>{dijkstraResult[currentStep].table[1][index] ? 'true' : 'false'}</td>
                                        <td>{dijkstraResult[currentStep].table[2][index]}</td>
                                        <td>{dijkstraResult[currentStep].table[3][index] ?? 'none'}</td>
                                    </tr>
                                ) : null;
                            })}
                            </tbody>
                        </table>
                    </section>
                    <div className={'buttons is-grouped is-flex is-justify-content-space-between mt-5 pt-2'}>
                        <button
                            className="button"
                            onClick={() => setCurrentStep((prevStep) => Math.max(prevStep - 1, 0))}
                            disabled={currentStep === 0}
                        >
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </button>
                        <button
                            className="button"
                            onClick={() => setCurrentStep((prevStep) => Math.min(prevStep + 1, dijkstraResult.length - 1))}
                            disabled={currentStep === dijkstraResult.length - 1}
                        >
                            <FontAwesomeIcon icon={faArrowRight}/>
                        </button>
                    </div>
                    <button
                        className="button is-info mt-5"
                        onClick={() => {
                            infoToast('Resetting Graph...')
                            setDijkstraResult({})
                            setCurrentStep(0)
                        }}
                    >
                        <FontAwesomeIcon icon={faRefresh}/>
                        <p className={'ml-3'}>Reset</p>
                    </button>
                </div>
            )}
        </div>
    );
};


export default DijkstrasAlgorithmCanvas;
