"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.events = events;

var _rxjs = require("rxjs");

var _util = require("../util");

// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
function events(instanceId, api) {
  return (0, _util.memo)(instanceId, blockHash => (0, _rxjs.combineLatest)([api.rpc.chain.getBlock(blockHash), api.queryAt(blockHash).pipe((0, _rxjs.switchMap)(queryAt => queryAt.system.events()))]).pipe((0, _rxjs.map)(_ref => {
    let [block, events] = _ref;
    return {
      block,
      events
    };
  })));
}