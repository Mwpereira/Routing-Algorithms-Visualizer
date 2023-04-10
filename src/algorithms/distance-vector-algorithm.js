import {convertCanvasGraphOutput} from "../utilities/canvas-converter";

export const distanceVectorAlgorithm = (graph) => {
    const convertedGraph = convertCanvasGraphOutput(graph);
    return distanceVector(convertedGraph);
}

function distanceVector(graph) {
    let steps = [];

    // Get the number of nodes in the network
    const numNodes = Object.keys(graph).length;

    // Initialize the distance vectors to infinity for all nodes except the ones that are directly connected to the node

    // arr[node][distance]
    let distanceVectors = Array.from({ length: numNodes }, () =>
        Array.from({ length: numNodes }, () => Infinity)
    );

    // init distanceVectors with the values to themselves
    for (let i = 0; i < numNodes; i++) {
        distanceVectors[i][i] = 0;
    }

    for (const [startNode, [startNodeKey, startNodeValue]] of Object.entries(Object.entries(graph))) {
        for (const [endNode, [endNodeKey, endNodeValue]] of Object.entries(Object.entries(graph[startNodeKey]))) {
            distanceVectors[startNode][Object.keys(graph).indexOf(endNodeKey)] = graph[startNodeKey][endNodeKey];
        }
    }

    let text = `We have initialized the tables for all the ${numNodes} routers. This initial step is where the ` +
        `routers have not communicated with each other yet (t=0).`;
    steps.push({distanceVectors, text})
    // Run the distance-vector algorithm for numIterations iterations
    for (let iteration = 1; iteration <= numNodes; iteration++) {
        // Update the distance vector for each node in the network
        const updatedDistanceVector= updateDistanceVector(numNodes, distanceVectors, graph);
        distanceVectors = updatedDistanceVector.distanceVectors;
        text = updatedDistanceVector.text;
        steps.push({distanceVectors, text})
    }

    return {distanceVectors, steps};
}

function updateDistanceVector(numNodes, distanceVectors, graph) {
    let text = ``;
    let index_to_key_mapping = Object.keys(graph)

    for (let node = 0; node < numNodes; node++) {
        for (let neighborNode = 0; neighborNode < numNodes; neighborNode++) {
            if (neighborNode === node) {
                continue
            }
            for (let i = 0; i < numNodes; i++) {
                if (i === node) {
                    continue
                }

                if (distanceVectors[node][neighborNode] + distanceVectors[neighborNode][i] < distanceVectors[node][i]) {
                    text += `We found that through router ${index_to_key_mapping[node]} to ` +
                        `${index_to_key_mapping[neighborNode]} we can go to ${index_to_key_mapping[i]} faster. ` +
                        `The distance compared is (` +
                        `${distanceVectors[node][neighborNode] + distanceVectors[neighborNode][i]} < ${distanceVectors[node][i]}).\n\n`;

                    distanceVectors[node][i] = distanceVectors[node][neighborNode] + distanceVectors[neighborNode][i];
                }
            }
        }
    }

    if (text.length < 1) {
        text = `There were no shorter paths when comparing with other routers in this step`;
    }

    return {distanceVectors, text}
}
