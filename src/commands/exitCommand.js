const emoji = require('emoji-node');

class ExitCommand {
  get name() {
    return `exit... bye! ${emoji.get(':)')}`;
  }

  execute() {
    process.exit(0);
  }
}

module.exports = ExitCommand;
