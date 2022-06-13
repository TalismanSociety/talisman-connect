"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.referendumsFinished = referendumsFinished;

var _rxjs = require("rxjs");

var _util = require("../util");

// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
function referendumsFinished(instanceId, api) {
  return (0, _util.memo)(instanceId, () => api.derive.democracy.referendumIds().pipe((0, _rxjs.switchMap)(ids => api.query.democracy.referendumInfoOf.multi(ids)), (0, _rxjs.map)(infos => infos.map(o => o.unwrapOr(null)).filter(info => !!info && info.isFinished).map(info => info.asFinished))));
}