export const distanceVectorAlgorithm = (adjacencyMatrix, numIterations) => {
    return distanceVector(adjacencyMatrix, numIterations);
}

function distanceVector(graph, numIterations) {
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
    // Run the distance-vector algorithm for numIterations iterations
    for (let iteration = 1; iteration <= numIterations; iteration++) {
        // Update the distance vector for each node in the network
        //console.log(`Starting Node ${node} in Iteration ${iteration}`)
        distanceVectors = updateDistanceVector(numNodes, distanceVectors);
        console.table(distanceVectors)
    }

    return distanceVectors;
}

function updateDistanceVector(numNodes, distanceVectors) {
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
                    distanceVectors[node][i] = distanceVectors[node][neighborNode] + distanceVectors[neighborNode][i]
                    console.log(`changing ${node, neighborNode, i}`)
                }
            }
        }
    }
    return distanceVectors
}
