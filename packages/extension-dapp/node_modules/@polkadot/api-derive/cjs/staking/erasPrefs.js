"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._eraPrefs = _eraPrefs;
exports.erasPrefs = exports.eraPrefs = exports._erasPrefs = void 0;

var _rxjs = require("rxjs");

var _util = require("../util");

var _cache = require("./cache");

var _util2 = require("./util");

// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
const CACHE_KEY = 'eraPrefs';

function mapPrefs(era, all) {
  const validators = {};
  all.forEach(_ref => {
    let [key, prefs] = _ref;
    validators[key.args[1].toString()] = prefs;
  });
  return {
    era,
    validators
  };
}

function _eraPrefs(instanceId, api) {
  return (0, _util.memo)(instanceId, (era, withActive) => {
    const [cacheKey, cached] = (0, _cache.getEraCache)(CACHE_KEY, era, withActive);
    return cached ? (0, _rxjs.of)(cached) : api.query.staking.erasValidatorPrefs.entries(era).pipe((0, _rxjs.map)(r => (0, _cache.setEraCache)(cacheKey, withActive, mapPrefs(era, r))));
  });
}

const eraPrefs = (0, _util2.singleEra)('_eraPrefs');
exports.eraPrefs = eraPrefs;

const _erasPrefs = (0, _util2.combineEras)('_eraPrefs');

exports._erasPrefs = _erasPrefs;
const erasPrefs = (0, _util2.erasHistoricApply)('_erasPrefs');
exports.erasPrefs = erasPrefs;