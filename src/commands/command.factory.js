'use strict';

class CommandFactory {
  constructor() {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdout.write('\n');
    this.interval;
  }

  init(name) {
    console.log('name', name);
  }
}

module.exports = new CommandFactory();
