"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._ownSlashes = _ownSlashes;
exports.ownSlashes = exports.ownSlash = void 0;

var _rxjs = require("rxjs");

var _util = require("../util");

var _util2 = require("./util");

// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
function _ownSlashes(instanceId, api) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (0, _util.memo)(instanceId, (accountId, eras, _withActive) => eras.length ? (0, _rxjs.combineLatest)([(0, _rxjs.combineLatest)(eras.map(e => api.query.staking.validatorSlashInEra(e, accountId))), (0, _rxjs.combineLatest)(eras.map(e => api.query.staking.nominatorSlashInEra(e, accountId)))]).pipe((0, _rxjs.map)(_ref => {
    let [vals, noms] = _ref;
    return eras.map((era, index) => ({
      era,
      total: vals[index].isSome ? vals[index].unwrap()[1] : noms[index].unwrapOrDefault()
    }));
  })) : (0, _rxjs.of)([]));
}

const ownSlash = (0, _util.firstMemo)((api, accountId, era) => api.derive.staking._ownSlashes(accountId, [era], true));
exports.ownSlash = ownSlash;
const ownSlashes = (0, _util2.erasHistoricApplyAccount)('_ownSlashes');
exports.ownSlashes = ownSlashes;