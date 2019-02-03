class GraphEdge {
  /**
   * @param {GraphVEdge} vertex
   * @param {number} [weight=0]
   */
  constructor(dest, weight = 0) {
    this.dest = dest;
    this.weight = weight;
  }

  /**
   * @return {string}
   */
  getDest() {
    return this.dest;
  }

  /**
   * @return {string}
   */
  getWeight() {
    return this.weight;
  }
}

module.exports = GraphEdge;
