"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSubmittable = createSubmittable;

var _createClass = require("./createClass");

// Copyright 2017-2022 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createSubmittable(apiType, api, decorateMethod, registry, blockHash) {
  const Submittable = (0, _createClass.createClass)({
    api,
    apiType,
    blockHash,
    decorateMethod
  });
  return extrinsic => new Submittable(registry || api.registry, extrinsic);
}