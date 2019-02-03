class GraphVertex {
  constructor(name) {
    this.name = name;
    this.edges = [];
    this.neighbourhood = {};
  }

  /**
   * @param {GraphEdge}
   * @returns {GraphVertex} edges
   */
  getEdges() {
    return this.edges;
  }

  /**
   * @param {GraphEdge} edge
   * @returns {GraphVertex}
   */
  addEdge(edge) {
    // Do not allow duplicates
    if (this.neighbourhood[edge.getDest()]) {
      throw new Error(`${this} already has ${edge}`);
    }
    this.neighbourhood[edge.getDest()] = edge;
    this.edges.push(edge);
  }

  /**
   * @param {GraphEdge} vertex
   * @returns {GraphVertex}
   */
  getEdgeTo(vertex) {
    return this.neighbourhood[vertex];
  }

  /**
   * @param {function}
   * @returns {string}
   */
  toString() {
    return this.name;
  }
}

module.exports = GraphVertex;
