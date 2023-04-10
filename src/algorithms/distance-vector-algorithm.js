export const distanceVectorAlgorithm = (graph) => {
    return distanceVector(graph);
}

function distanceVector(graph) {
    let steps = [];

    // Get the number of nodes in the network
    const numNodes = Object.keys(graph).length;
    console.log(numNodes)
    // Initialize the distance vectors to infinity for all nodes except the ones that are directly connected to the node

    // arr[node][distance]
    let distanceVectors = Array.from({ length: numNodes }, () =>
        Array.from({ length: numNodes }, () => Infinity)
    );

    console.log("INIT")
    console.log(distanceVectors)

    // init distanceVectors with the values to themselves
    for (let i = 0; i < numNodes; i++) {
        distanceVectors[i][i] = 0;
    }

    console.log("INIT")
    console.log(distanceVectors)

    for (const [startNode, [startNodeKey, startNodeValue]] of Object.entries(Object.entries(graph))) {
        for (const [endNode, [endNodeKey, endNodeValue]] of Object.entries(Object.entries(graph[startNodeKey]))) {
            distanceVectors[startNode][Object.keys(graph).indexOf(endNodeKey)] = graph[startNodeKey][endNodeKey];
            // console.log(`{${startNode}:${endNode}} == ${graph[startNodeKey][endNodeKey]} = || ${endNodeKey} = ${endNodeValue}`);
        }
    }

    console.table(distanceVectors)
    let text = `We have initialized the tables for all the ${numNodes} routers. This initial step is where the ` +
        `routers have not communicated with each other yet(t=0)`;
    steps.push({distanceVectors, text})
    // Run the distance-vector algorithm for numIterations iterations
    for (let iteration = 1; iteration <= numNodes; iteration++) {
        // Update the distance vector for each node in the network
        //console.log(`Starting Node ${node} in Iteration ${iteration}`)
        let text;
        distanceVectors, text = updateDistanceVector(numNodes, distanceVectors, graph);
        steps.push({distanceVectors, text})
        console.table(distanceVectors)
    }

    return distanceVectors, steps;
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

                    console.log(`changing ${node, neighborNode, i}`)
                }
            }
        }
    }

    if (text.length < 1) {
        text = `There were no shorter paths when comparing with other routers in this step`;
    }

    return distanceVectors, text
}
