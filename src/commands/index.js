'use strict';

const program = require('commander');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const { prompt } = require('inquirer');

const CommandFactory = require('./command.factory');
const CommandBuilder = require('./command.build');

/**
 * @class InitCLIBuilder
 * @extends {CommandBuilder}
 * @description create a builder to intializer cli
 * @author Cássio Paixão
 */
class InitCLIBuilder extends CommandBuilder {
  constructor() {
    super();
    this.init = this.initCLI();
    this.create = this.createCLI();
    this.end = this.endCLI();
    super.init();
  }

  /**
   * @method initCLI
   * @description Intializer CLI
   */
  initCLI() {
    clear();
    console.log(
      chalk.green(
        figlet.textSync('Challeng Train', {
          horizontalLayout: 'full',
        }),
      ),
    );

    program.description('start test trains with js');
  }

  /**
   * @method createCLI
   * @description create options questions to CLI
   */
  createCLI() {
    this.options = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter data for test: ',
      },
    ];

    program
      .command('start')
      .alias('s')
      .description('Start Test')
      .action(() => {
        prompt(this.options).then(option => {
          CommandFactory.init(option.name.toString());
        });
      });
  }

  /**
   * @method endCLI
   * @description finalize CLI
   */
  endCLI() {
    if (
      !process.argv.slice(2).length ||
      !/[arudl]/.test(process.argv.slice(2))
    ) {
      program.outputHelp();
      process.exit();
    }
    program.parse(process.argv);
  }
}

module.exports = new InitCLIBuilder();
