"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.member = member;

var _rxjs = require("rxjs");

var _util = require("../util");

// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @description Get the member info for a society
 */
function member(instanceId, api) {
  return (0, _util.memo)(instanceId, accountId => api.derive.society._members([accountId]).pipe((0, _rxjs.map)(_ref => {
    let [result] = _ref;
    return result;
  })));
}