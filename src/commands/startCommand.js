class StartCommand {
  constructor(value) {
    this.value = value;
  }

  get name() {
    return `test ${this.value}`;
  }

  execute() {
    console.log(this.value);
  }
}

module.exports = StartCommand;
