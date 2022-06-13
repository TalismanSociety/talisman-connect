"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._erasRewards = _erasRewards;
exports.erasRewards = void 0;

var _rxjs = require("rxjs");

var _util = require("../util");

var _cache = require("./cache");

var _util2 = require("./util");

// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
const CACHE_KEY = 'eraRewards';

function mapRewards(eras, optRewards) {
  return eras.map((era, index) => ({
    era,
    eraReward: optRewards[index].unwrapOrDefault()
  }));
}

function _erasRewards(instanceId, api) {
  return (0, _util.memo)(instanceId, (eras, withActive) => {
    if (!eras.length) {
      return (0, _rxjs.of)([]);
    }

    const cached = (0, _cache.getEraMultiCache)(CACHE_KEY, eras, withActive);
    const remaining = (0, _util2.filterEras)(eras, cached);

    if (!remaining.length) {
      return (0, _rxjs.of)(cached);
    }

    return api.query.staking.erasValidatorReward.multi(remaining).pipe((0, _rxjs.map)(r => (0, _cache.filterCachedEras)(eras, cached, (0, _cache.setEraMultiCache)(CACHE_KEY, withActive, mapRewards(remaining, r)))));
  });
}

const erasRewards = (0, _util2.erasHistoricApply)('_erasRewards');
exports.erasRewards = erasRewards;