"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorateErrors = decorateErrors;
exports.variantToMeta = variantToMeta;

var _util = require("@polkadot/util");

var _lazy = require("../../../create/lazy");

var _util2 = require("../util");

// Copyright 2017-2022 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0
function variantToMeta(lookup, variant) {
  return (0, _util.objectSpread)({
    args: variant.fields.map(_ref => {
      let {
        type
      } = _ref;
      return lookup.getTypeDef(type).type;
    })
  }, variant);
}
/** @internal */


function decorateErrors(registry, _ref2, version) {
  let {
    lookup,
    pallets
  } = _ref2;
  const result = {};

  for (let i = 0; i < pallets.length; i++) {
    const {
      errors,
      index,
      name
    } = pallets[i];

    if (errors.isSome) {
      const sectionIndex = version >= 12 ? index.toNumber() : i;
      (0, _util.lazyMethod)(result, (0, _util.stringCamelCase)(name), () => (0, _lazy.lazyVariants)(lookup, errors.unwrap(), _util2.objectNameToString, variant => ({
        // We sprinkle in isCodec & isU8a to ensure we are dealing with the correct objects
        is: errorMod => (0, _util.isCodec)(errorMod) && (0, _util.isCodec)(errorMod.index) && errorMod.index.eq(sectionIndex) && ((0, _util.isU8a)(errorMod.error) ? errorMod.error[0] === variant.index.toNumber() : (0, _util.isCodec)(errorMod.error) && errorMod.error.eq(variant.index)),
        meta: registry.createTypeUnsafe('ErrorMetadataLatest', [variantToMeta(lookup, variant)])
      })));
    }
  }

  return result;
}