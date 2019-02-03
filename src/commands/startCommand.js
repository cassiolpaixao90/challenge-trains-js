const parseGraph = require('../services');
const Graph = require('../services/graph');

class StartCommand {
  constructor(value) {
    this.value = value;
  }

  get name() {
    return `test ${this.value}`;
  }

  execute() {
    const parse = parseGraph.init(this.value);
    const graph = new Graph();

    const noRoute = 'NO SUCH ROUTE';

    // Question 1
    let answer = graph.measurePath(parse, ['A', 'B', 'C']);
    console.log(answer == null ? noRoute : answer);

    // Question 2
    answer = graph.measurePath(parse, ['A', 'D']);
    console.log(answer == null ? noRoute : answer);

    // Question 3
    answer = graph.measurePath(parse, ['A', 'D', 'C']);
    console.log(answer == null ? noRoute : answer);

    // Question 4
    answer = graph.measurePath(parse, ['A', 'E', 'B', 'C', 'D']);
    console.log(answer == null ? noRoute : answer);

    // Question 5
    answer = graph.measurePath(parse, ['A', 'E', 'D']);
    console.log(answer == null ? noRoute : answer);

    // Question 6
    answer = graph.numPaths(parse.C, parse.C, 3, false, false, parse);
    console.log(answer == null ? 0 : answer);

    // Question 7
    answer = graph.numPaths(parse.A, parse.C, 4, true, false, parse);
    console.log(answer == null ? 0 : answer);

    // Question 8
    answer = graph.getDistance(parse.A, parse.C);
    console.log(answer == null ? noRoute : answer);

    // Question 9
    answer = graph.getDistance(parse.B, parse.B);
    console.log(answer == null ? noRoute : answer);

    // Question 10
    answer = graph.numPaths(parse.C, parse.C, 29, false, true, parse);
    console.log(answer == null ? 0 : answer);

    process.exit(0);
  }
}

module.exports = StartCommand;
