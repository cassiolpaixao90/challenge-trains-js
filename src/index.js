const figlet = require('figlet');
const chalk = require('chalk');
const clear = require('clear');
const conductor = require('./commands/conductor');

const ExitCommand = require('./commands/exitCommand');
const StartCommand = require('./commands/startCommand');

var { createInterface } = require('readline');
var rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

clear();
console.log(chalk.green(

));

console.log(chalk.hex('#ec6aa0').bold(figlet.textSync(`Challenge TW =)`, {
  horizontalLayout: 'full',
})));

console.log(`test <value> | exit`);
rl.prompt();

rl.on('line', input => {

  const [commandText, ...remaining] = input.split(' ');
  const [...value] = remaining;
  const text = value.join(' ');

  switch (commandText) {

    case 'exit':
      conductor.run(new ExitCommand());
      break;

    case 'test' :
      conductor.run(new StartCommand(text));
      break;

    default :
      console.log(`${commandText} command not found!`);
  }

  rl.prompt();

});
