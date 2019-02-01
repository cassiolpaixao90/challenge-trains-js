/**
 *
 */
class DistanceVertice {
  constructor() {
    this.distances = {};
    this.visitedVertices = {};
    this.previousVertices = {};
    this.queue = new PriorityQueue();
  }
}

export default DistanceVertice;
