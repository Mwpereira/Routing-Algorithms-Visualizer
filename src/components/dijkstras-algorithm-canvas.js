import React, {useState} from "react";
import DraggableNode from "../components/draggable-node";
import Connection from "../components/connection";
import "../assets/styles/dijstras-canvas.css"
import connection from "../components/connection";
import {errorToast, infoToast, successToast} from "../utilities/toast";
import {dijkstraAlgorithm} from "../algorithms/dijkstra-algorithm";

const DijkstrasAlgorithmCanvas = () => {
    const [nodes, setNodes] = useState([
        {id: "A", x: 150, y: 100},
        {id: "B", x: 400, y: 100},
        {id: "C", x: 250, y: 250},
    ]);

    const [connections, setConnections] = useState([
        {id: "AB", startNodeId: "A", endNodeId: "B", weight: 10},
        {id: "BC", startNodeId: "B", endNodeId: "C", weight: 15},
    ]);

    const [selectedConnectionId, setSelectedConnectionId] = useState(null);
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [selectedWeight, setSelectedWeight] = useState(null);
    const [startingNode, setStartingNode] = useState("A"); // New state for the starting node


    const updateNodePosition = (nodeId, x, y) => {
        setNodes((prevNodes) =>
            prevNodes.map((node) => (node.id === nodeId ? {...node, x, y} : node))
        );
    };

    const updateConnectionWeight = (connectionId, weight) => {
        setConnections((prevConnections) =>
            prevConnections.map((connection) =>
                connection.id === connectionId ? {...connection, weight} : connection
            )
        );
    };

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

    const handleNodeClick = (nodeId, selected) => {
        if (selected) {
            setSelectedNodes((prevSelectedNodes) => [...prevSelectedNodes, nodeId]);
        } else {
            setSelectedNodes((prevSelectedNodes) =>
                prevSelectedNodes.filter((id) => id !== nodeId)
            );
        }
    };

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
                    id: newConnectionId,
                    startNodeId: selectedNodes[0],
                    endNodeId: selectedNodes[1],
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
                    <svg width="100%" height="100%">
                        {connections.map((connection) => {
                            const startNode = nodes.find((node) => node.id === connection.startNodeId);
                            const endNode = nodes.find((node) => node.id === connection.endNodeId);

                            return (
                                <Connection
                                    key={connection.id}
                                    startNode={startNode}
                                    endNode={endNode}
                                    weight={connection.weight}
                                    selected={selectedConnectionId === connection.id}
                                    onSelect={(e) => {
                                        e.stopPropagation();
                                        handleSelectConnection(connection.id);
                                    }}
                                />
                            );
                        })}
                    </svg>
                    {nodes.map((node) => (
                        <DraggableNode
                            key={node.id}
                            nodeId={node.id}
                            x={node.x}
                            y={node.y}
                            selected={selectedNodes.includes(node.id)}
                            onDrag={(x, y) => {
                                updateNodePosition(node.id, x, y);
                            }}
                            onClick={(selected) => {
                                handleNodeClick(node.id, selected);
                            }}
                            onRemove={() => removeNode(node.id)}
                        />
                    ))}
                </div>
            </div>
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
                                    type="number"
                                    value={selectedWeight}
                                    onChange={(e) => setSelectedWeight(parseInt(e.target.value))}
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
                                    value={startingNode}
                                    onChange={(e) => setStartingNode(e.target.value)}
                                    required={true}
                                >
                                    <option value="" disabled>Select starting node</option>
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

                                dijkstraAlgorithm({nodes, connections}, startingNode);
                            }}
                        >
                            Calculate
                        </button>
                    </div>
                </section>
            </section>
        </div>
    );
};


export default DijkstrasAlgorithmCanvas;
