
# Project Info

## Group Info 

Michael Pereira - 500896409

Udbhav Prasad - 500909034

Himal Patel - 500873885

Athavan Thanaraj - 501027195

Umair Tariq - 501050119

Jared Amaro - 500949423

## Installation Instructions

Site is located at <a href="https://routing-algorithms.netlify.app/">routing-algorithms.netlify.app/</a>

## How to use Site

### Graph Building User Interface

To add nodes to the graph, use the button "Add Node" to the graph. You can drag around this node to make it look 
better to your liking.

To connect two nodes together, click on "Connect Nodes" then click on the two nodes you would like to connect. After 
this, once again click on "Connect Nodes" and it will create and draw this edge with a weight of '1'. 

To change the weight of an edge, click on the edge and a text-box will pop up below the graph. Then change the value 
in the text-box and click the "Update Weight" button.

## Dijkstra's Link-State Routing Algorithm

Dijkstra's algorithm is a centralized routing algorithm that computes the least-cost path between a source node and a 
destination node of a graph. Dijkstra's algorithm computes this value with the complete knowledge about the network 
topology including link costs between all nodes. Dijkstra's algorithm takes an iterative approach to solving this 
problem.

### Algorithm

1. Our implementation of this algorithm takes input of the graph in the form of an adjacency list representation.
2. The graph auto-generates text based on the graph and procedure to describe what the algorithm is doing, how it is 
doing it and why.
3. Dijkstra's algorithm maintains a table which maintains information about the algorithm's work on the graph. 

## Distance Vector Routing Algorithm

The Distance Vector routing algorithm is a decentralized routing algorithm that computes the least-cost path between a 
source node and a destination node of a graph. 