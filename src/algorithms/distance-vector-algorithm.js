import {convertCanvasGraphOutput} from "../utilities/canvas-converter";

export const distanceVectorAlgorithm = (graph, numberOfIterations) => {
    const convertedGraph = convertCanvasGraphOutput(graph);
    return distanceVector(convertedGraph, numberOfIterations);
}

function distanceVector(graph, numberOfIterations) {
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
            console.log()
            distanceVectors[startNode][Object.keys(graph).indexOf(endNodeKey)] = graph[startNodeKey][endNodeKey];
        }
    }

    let text = `We have initialized the tables for all the ${numNodes} routers. This initial step is where the ` +
        `routers have not communicated with each other yet (t=0).`;

    let updatedVectors = JSON.parse(JSON.stringify(distanceVectors));
    steps.push({distanceVectors: updatedVectors, text})

    // Run the distance-vector algorithm for numIterations iterations
    for (let iteration = 1; iteration <= numberOfIterations; iteration++) {
        // Update the distance vector for each node in the network
        const updatedDistanceVector= updateDistanceVector(numNodes, distanceVectors, graph, iteration);
        distanceVectors = updatedDistanceVector.distanceVectors;
        let updatedVectorsDupe = JSON.parse(JSON.stringify(distanceVectors));
        text = updatedDistanceVector.text;
        steps.push({distanceVectors: updatedVectorsDupe, text})
    }

    return {distanceVectors, steps};
}

function updateDistanceVector(numNodes, distanceVectors, graph, iter) {
    let text = ``;
    let index_to_key_mapping = Object.keys(graph)

    let main_distanceVector = JSON.parse(JSON.stringify(distanceVectors));;

    for (let i = 0; i < main_distanceVector.length; i++) {
        for (let j = 0; j < main_distanceVector[i].length; j++) {
            if (main_distanceVector[i][j] === null) {
                main_distanceVector[i][j] = Infinity;
            }
        }
    }

    for (let node = 0; node < numNodes; node++) {
        for (let neighborNode = 0; neighborNode < numNodes; neighborNode++) {
            if (neighborNode === node) {
                continue
            }
            for (let i = 0; i < numNodes; i++) {
                if (i === node) {
                    continue
                }

                if (main_distanceVector[node][neighborNode] + main_distanceVector[neighborNode][i] < main_distanceVector[node][i]) {
                    text += `We found that through router ${index_to_key_mapping[node]} to ` +
                        `${index_to_key_mapping[neighborNode]} we can go to ${index_to_key_mapping[i]} faster. ` +
                        `The distance compared is (` +
                        `${main_distanceVector[node][neighborNode] + main_distanceVector[neighborNode][i]} < ${main_distanceVector[node][i]}).\n\n`;

                    distanceVectors[node][i] = main_distanceVector[node][neighborNode] + main_distanceVector[neighborNode][i];
                }
            }
        }
    }

    if (text.length < 1) {
        text = `There were no shorter paths when comparing with other routers in this step: t = ${iter}`;
    }

    return {distanceVectors, text}
}
