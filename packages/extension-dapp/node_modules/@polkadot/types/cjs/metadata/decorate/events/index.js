"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorateEvents = decorateEvents;
exports.filterEventsSome = filterEventsSome;

var _util = require("@polkadot/util");

var _lazy = require("../../../create/lazy");

var _errors = require("../errors");

var _util2 = require("../util");

// Copyright 2017-2022 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0
function filterEventsSome(_ref) {
  let {
    events
  } = _ref;
  return events.isSome;
}
/** @internal */


function decorateEvents(registry, _ref2, version) {
  let {
    lookup,
    pallets
  } = _ref2;
  const result = {};
  const filtered = pallets.filter(filterEventsSome);

  for (let i = 0; i < filtered.length; i++) {
    const {
      events,
      index,
      name
    } = filtered[i];
    const sectionIndex = version >= 12 ? index.toNumber() : i;
    (0, _util.lazyMethod)(result, (0, _util.stringCamelCase)(name), () => (0, _lazy.lazyVariants)(lookup, events.unwrap(), _util2.objectNameToString, variant => ({
      // We sprinkle in isCodec & isU8a to ensure we are dealing with the correct objects
      is: eventRecord => (0, _util.isCodec)(eventRecord) && (0, _util.isU8a)(eventRecord.index) && sectionIndex === eventRecord.index[0] && variant.index.eq(eventRecord.index[1]),
      meta: registry.createTypeUnsafe('EventMetadataLatest', [(0, _errors.variantToMeta)(lookup, variant)])
    })));
  }

  return result;
}