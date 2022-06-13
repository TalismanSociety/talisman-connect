"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentPoints = currentPoints;

var _rxjs = require("rxjs");

var _util = require("../util");

// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @description Retrieve the staking overview, including elected and points earned
 */
function currentPoints(instanceId, api) {
  return (0, _util.memo)(instanceId, () => api.derive.session.indexes().pipe((0, _rxjs.switchMap)(_ref => {
    let {
      activeEra
    } = _ref;
    return api.query.staking.erasRewardPoints(activeEra);
  })));
}