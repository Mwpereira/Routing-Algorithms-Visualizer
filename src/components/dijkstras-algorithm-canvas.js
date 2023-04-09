import React, {useState} from "react";
import DraggableNode from "../components/draggable-node";
import Edge from "./edge";
import "../assets/styles/dijstras-canvas.css"
import {dismissToast, errorToast, infoToast, successToast} from "../utilities/toast";
import {dijkstraAlgorithm} from "../algorithms/dijkstra-algorithm";
import useStore from "../store";
import {toast} from "react-toastify";

const DijkstrasAlgorithmCanvas = () => {
    // Store
    const {dijkstraResult, setDijkstraResult} = useStore();

    // State for nodes in the graph with initial values
    const [nodes, setNodes] = useState([
        {id: "A", x: 150, y: 100},
        {id: "B", x: 400, y: 100},
        {id: "C", x: 250, y: 250},
    ]);

    // State for connections between nodes in the graph with initial values
    const [connections, setConnections] = useState([
        {endNodeId: "B", id: "AB", startNodeId: "A", weight: 10},
        {endNodeId: "C", id: "BC", startNodeId: "B", weight: 15},
    ]);

    // State for currently selected connection ID
    const [selectedConnectionId, setSelectedConnectionId] = useState(null);
    // State for currently selected nodes in the graph
    const [selectedNodes, setSelectedNodes] = useState([]);
    // State for the selected weight of the connection
    const [selectedWeight, setSelectedWeight] = useState(null);
    // New state for the starting node
    const [startingNode, setStartingNode] = useState("A");

    // Updates the position of a node in the graph
    const updateNodePosition = (nodeId, x, y) => {
        setNodes((prevNodes) =>
            prevNodes.map((node) => (node.id === nodeId ? {...node, x, y} : node))
        );
    };

    // Updates the weight of a connection in the graph
    const updateConnectionWeight = (connectionId, weight) => {
        setConnections((prevConnections) =>
            prevConnections.map((connection) =>
                connection.id === connectionId ? {...connection, weight} : connection
            )
        );
    };

    // Handles the selection of a connection
    const handleSelectConnection = (connectionId) => {
        if (selectedConnectionId === connectionId) {
            setSelectedConnectionId(null);
            setSelectedWeight(null);
        } else {
            setSelectedConnectionId(connectionId);
            const connection = connections.find((c) => c.id === connectionId);
            setSelectedWeight(connection.weight);
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
            const newConnectionId = selectedNodes.join("");
            if (
                !connections.some(
                    (connection) =>
                        connection.id === newConnectionId ||
                        connection.id === newConnectionId.split("").reverse().join("")
                )
            ) {
                const newConnection = {
                    endNodeId: selectedNodes[1],
                    id: newConnectionId,
                    startNodeId: selectedNodes[0],
                    weight: 1,
                };
                setConnections((prevConnections) => [...prevConnections, newConnection]);
                setSelectedNodes([]);
            }
        }
    };

    const removeNode = (nodeId) => {
        // Remove node from nodes list
        setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));

        // Remove connections involving the node
        setConnections((prevConnections) =>
            prevConnections.filter(
                (connection) =>
                    connection.startNodeId !== nodeId && connection.endNodeId !== nodeId
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
                        {connections.map((connection) => {
                            const startNode = nodes.find((node) => node.id === connection.startNodeId);
                            const endNode = nodes.find((node) => node.id === connection.endNodeId);

                            return (
                                <Edge
                                    endNode={endNode}
                                    key={connection.id}
                                    onSelect={(e) => {
                                        e.stopPropagation();
                                        handleSelectConnection(connection.id);
                                    }}
                                    selected={selectedConnectionId === connection.id}
                                    startNode={startNode}
                                    weight={connection.weight}
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
                {selectedConnectionId && (
                    <div className={'column is-6 mt-2 pl-0 pb-0'}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (selectedWeight !== null) {
                                    updateConnectionWeight(selectedConnectionId, selectedWeight);
                                }
                                setSelectedConnectionId(null); // Unselect the edge
                            }}
                        >
                            <label className={'label'}>
                                Connection <span style={{color: '#f71a1a'}}>{selectedConnectionId}</span>:{" "}
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

                                const result = dijkstraAlgorithm({connections, nodes}, startingNode);

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
