"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._stakerPoints = _stakerPoints;
exports.stakerPoints = void 0;

var _rxjs = require("rxjs");

var _util = require("../util");

var _util2 = require("./util");

// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
function _stakerPoints(instanceId, api) {
  return (0, _util.memo)(instanceId, (accountId, eras, withActive) => {
    const stakerId = api.registry.createType('AccountId', accountId).toString();
    return api.derive.staking._erasPoints(eras, withActive).pipe((0, _rxjs.map)(points => points.map(_ref => {
      let {
        era,
        eraPoints,
        validators
      } = _ref;
      return {
        era,
        eraPoints,
        points: validators[stakerId] || api.registry.createType('RewardPoint')
      };
    })));
  });
}

const stakerPoints = (0, _util2.erasHistoricApplyAccount)('_stakerPoints');
exports.stakerPoints = stakerPoints;