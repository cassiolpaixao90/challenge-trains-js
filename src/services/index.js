const GraphVertex = require('./vertex');
const GraphEdge = require('./edge');

class ParseGraph {
  init(value) {
    const vertexSet = {};

    const edgeStrs = value.split(/i,|\s/);

    for (let j = 0; j < edgeStrs.length; j++) {
      const edgeStr = edgeStrs[j];
      if (edgeStr.length >= 3) {
        // Parse
        const v1 = edgeStr[0];
        const v2 = edgeStr[1];
        let weight = edgeStr.slice(2);

        if (weight.match(/^-?[0-9]*$/) == null) {
          throw new TypeError('Edge weights must be integers');
        }

        weight = parseInt(weight);
        if (weight <= 0) throw new TypeError('Edge weights must be positive');

        // Update vertex set
        if (vertexSet[v1] == null) vertexSet[v1] = new GraphVertex(v1);
        if (vertexSet[v2] == null) vertexSet[v2] = new GraphVertex(v2);

        // Add edge
        vertexSet[v1].addEdge(new GraphEdge(vertexSet[v2], weight));
      } else if (edgeStr.length > 0) {
        throw new Error('Edge descriptions should match');
      }
    }
    return vertexSet;
  }
}

module.exports = new ParseGraph();
