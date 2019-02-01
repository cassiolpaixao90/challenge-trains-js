'use strict';

/**
 * @class CommandBuilder
 * @extends {CommandBuilder}
 * @description pattern builder for create function per options
 * @author Cássio Paixão
 */
class CommandBuilder {
  /**
   * @description
   */
  init() {
    Object.keys(this).forEach(key => {
      const witherName = `with${key
        .substring(0, 1)
        .toUpperCase()}${key.substring(1)}`;
      this[witherName] = value => {
        this[key] = value;
        return this;
      };
    });
  }

  /**
   * @description
   */
  build() {
    const keysNoWithers = Object.keys(this).filter(
      key => typeof this[key] === 'function',
    );

    return keysNoWithers.reduce((returnValue, key) => {
      return {
        ...returnValue,
        [key]: this[key],
      };
    }, {});
  }
}

module.exports = CommandBuilder;
