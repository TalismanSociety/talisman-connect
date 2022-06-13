"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._ownExposures = _ownExposures;
exports.ownExposures = exports.ownExposure = void 0;

var _rxjs = require("rxjs");

var _util = require("../util");

var _util2 = require("./util");

// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
function _ownExposures(instanceId, api) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (0, _util.memo)(instanceId, (accountId, eras, _withActive) => eras.length ? (0, _rxjs.combineLatest)([(0, _rxjs.combineLatest)(eras.map(e => api.query.staking.erasStakersClipped(e, accountId))), (0, _rxjs.combineLatest)(eras.map(e => api.query.staking.erasStakers(e, accountId)))]).pipe((0, _rxjs.map)(_ref => {
    let [clp, exp] = _ref;
    return eras.map((era, index) => ({
      clipped: clp[index],
      era,
      exposure: exp[index]
    }));
  })) : (0, _rxjs.of)([]));
}

const ownExposure = (0, _util.firstMemo)((api, accountId, era) => api.derive.staking._ownExposures(accountId, [era], true));
exports.ownExposure = ownExposure;
const ownExposures = (0, _util2.erasHistoricApplyAccount)('_ownExposures');
exports.ownExposures = ownExposures;