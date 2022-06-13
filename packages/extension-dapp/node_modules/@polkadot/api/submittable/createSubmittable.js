// Copyright 2017-2022 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { createClass } from "./createClass.js";
export function createSubmittable(apiType, api, decorateMethod, registry, blockHash) {
  const Submittable = createClass({
    api,
    apiType,
    blockHash,
    decorateMethod
  });
  return extrinsic => new Submittable(registry || api.registry, extrinsic);
}