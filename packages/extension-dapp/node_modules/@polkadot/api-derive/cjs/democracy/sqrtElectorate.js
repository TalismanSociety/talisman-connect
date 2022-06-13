"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sqrtElectorate = sqrtElectorate;

var _rxjs = require("rxjs");

var _util = require("@polkadot/util");

var _util2 = require("../util");

// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
function sqrtElectorate(instanceId, api) {
  return (0, _util2.memo)(instanceId, () => api.query.balances.totalIssuance().pipe((0, _rxjs.map)(_util.bnSqrt)));
}