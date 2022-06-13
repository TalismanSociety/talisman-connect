"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typesToMap = typesToMap;

// Copyright 2017-2022 @polkadot/types-codec authors & contributors
// SPDX-License-Identifier: Apache-2.0
function typesToMap(registry, _ref) {
  let [Types, keys] = _ref;
  const result = {};

  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = registry.getClassName(Types[i]) || new Types[i](registry).toRawType();
  }

  return result;
}