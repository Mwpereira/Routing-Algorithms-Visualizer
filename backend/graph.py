
class Graph:
    """
    Graph Data Structure represented by this schema:
    {
        node1: [[connecting_node, weight], ...],
        node2: [[connecting_node, weight], ...]
    }
    """
    def __init__(self, graph: dict):
        self.graph = graph
        self.nodes = graph.keys()

    def getGraphDict(self):
        return self.graph
