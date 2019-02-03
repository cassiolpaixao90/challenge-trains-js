const PriorityQueue = require('../helpers/priorityQueue');

class Graph {
  constructor() {}

  measurePath(vertexSet, path) {
    // Get actual vertices from names
    path = path.map(name => vertexSet[name]);

    // Do the measurement
    let length = 0;
    for (let i = 0, j = 1; j < path.length; j = (i = j) + 1) {
      if (path[i] == null) {
        return null;
      }
      const edge = path[i].getEdgeTo(path[j]);

      if (edge == null) {
        return null;
      }

      length += edge.getWeight();
    }
    return length;
  }

  numPaths(
    startVertex,
    endVertex,
    maxLength,
    exactLength,
    useWeights,
    vertexSet,
  ) {
    const pathCounts = [];
    for (let thisLen = 0; thisLen <= maxLength; thisLen++) {
      pathCounts[thisLen] = {};
      for (const vertexName in vertexSet) {
        const vertex = vertexSet[vertexName];
        let count = 0;
        const edges = vertex.getEdges();
        for (let i = 0; i < edges.length; i++) {
          const edgeLen = useWeights ? edges[i].getWeight() : 1;
          const edgeDest = edges[i].getDest();
          if (edgeLen <= thisLen) {
            count += pathCounts[thisLen - edgeLen][edgeDest];
          }
        }
        if (vertex == endVertex && (!exactLength || thisLen == 0)) {
          count++;
        }
        pathCounts[thisLen][vertex] = count;
      }
    }

    return (
      pathCounts[maxLength][startVertex]
      - ((!exactLength || maxLength == 0) && startVertex == endVertex ? 1 : 0)
    );
  }

  getDistance(start, end) {
    const verticesToCheck = new PriorityQueue();
    const hasBeenQueued = {};

    const processVertex = (vertex, distance) => {
      try {
        const edges = vertex.getEdges();
        for (let i = 0; i < edges.length; i++) {
          const newVert = edges[i].getDest();
          const newDist = distance + edges[i].getWeight();
          if (hasBeenQueued[newVert]) {
            verticesToCheck.decreaseKey(newVert, newDist);
          } else {
            verticesToCheck.add(newDist, newVert);
            hasBeenQueued[newVert] = true;
          }
        }
      } catch (e) {}
    };

    processVertex(start, 0);

    let queueElem;
    while ((queueElem = verticesToCheck.extractMin()) != null) {
      const distance = queueElem.key;
      const vertex = queueElem.value;
      if (vertex == end) {
        return distance;
      }
      processVertex(vertex, distance);
    }
    return null;
  }
}

module.exports = Graph;
