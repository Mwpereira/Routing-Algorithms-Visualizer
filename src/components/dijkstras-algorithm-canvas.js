import React, {useState} from "react";
import DraggableNode from "../components/draggable-node";
import Edge from "./edge";
import "../assets/styles/dijstras-canvas.css"
import {dismissToast, errorToast, infoToast, successToast} from "../utilities/toast";
import {dijkstraAlgorithm} from "../algorithms/dijkstra-algorithm";
import useStore from "../store";

const DijkstrasAlgorithmCanvas = () => {
    // Store
    const {dijkstraResult, setDijkstraResult} = useStore();

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
    // New state for the starting node
    const [startingNode, setStartingNode] = useState("A");

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
        if (selectedEdgeId === edgeId) {
            setSelectedEdgeId(null);
            setSelectedWeight(null);
        } else {
            setSelectedEdgeId(edgeId);
            const edge = edges.find((e) => e.id === edgeId);
            setSelectedWeight(edge.weight);
        }
    };

    // Handles the selection of a node in the graph
    const handleNodeClick = (nodeId, selected) => {
        if (selected) {
            setSelectedNodes((prevSelectedNodes) => [...prevSelectedNodes, nodeId]);
        } else {
            setSelectedNodes((prevSelectedNodes) =>
                prevSelectedNodes.filter((id) => id !== nodeId)
            );
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
                        />
                    ))}
                </div>
            </div>
            {Object.keys(dijkstraResult).length === 0 && (
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
                                    console.log(nodes)
                                    if (nodes.length < 2) {
                                        errorToast('Please add at least two nodes');
                                        return;
                                    }

                                    if (!nodes.find((node) => node.id === startingNode)) {
                                        errorToast('Please select a starting node');
                                        return;
                                    }

                                    infoToast('Calculating...')

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
        </div>
    );
};


export default DijkstrasAlgorithmCanvas;
