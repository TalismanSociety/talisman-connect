"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Range = void 0;

var _Tuple = require("../base/Tuple");

// Copyright 2017-2022 @polkadot/types-codec authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name Range
 * @description
 * Rust `Range<T>` representation
 */
class Range extends _Tuple.Tuple {
  #rangeName;

  constructor(registry, Type, value) {
    let {
      rangeName = 'Range'
    } = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    super(registry, [Type, Type], value);
    this.#rangeName = rangeName;
  }

  static with(Type) {
    return class extends Range {
      constructor(registry, value) {
        super(registry, Type, value);
      }

    };
  }
  /**
   * @description Returns the starting range value
   */


  get start() {
    return this[0];
  }
  /**
   * @description Returns the ending range value
   */


  get end() {
    return this[1];
  }
  /**
   * @description Returns the base runtime type name for this instance
   */


  toRawType() {
    return `${this.#rangeName}<${this.start.toRawType()}>`;
  }

}

exports.Range = Range;