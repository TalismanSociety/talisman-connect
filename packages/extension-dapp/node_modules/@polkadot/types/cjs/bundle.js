"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  typeDefinitions: true,
  rpcDefinitions: true,
  TypeDefInfo: true,
  convertSiV0toV1: true,
  packageInfo: true,
  unwrapStorageType: true
};
Object.defineProperty(exports, "TypeDefInfo", {
  enumerable: true,
  get: function () {
    return _typesCreate.TypeDefInfo;
  }
});
Object.defineProperty(exports, "convertSiV0toV1", {
  enumerable: true,
  get: function () {
    return _PortableRegistry.convertSiV0toV1;
  }
});
Object.defineProperty(exports, "packageInfo", {
  enumerable: true,
  get: function () {
    return _packageInfo.packageInfo;
  }
});
Object.defineProperty(exports, "rpcDefinitions", {
  enumerable: true,
  get: function () {
    return _jsonrpc.default;
  }
});
exports.typeDefinitions = void 0;
Object.defineProperty(exports, "unwrapStorageType", {
  enumerable: true,
  get: function () {
    return _StorageKey.unwrapStorageType;
  }
});

var typeDefinitions = _interopRequireWildcard(require("./interfaces/definitions"));

exports.typeDefinitions = typeDefinitions;

var _jsonrpc = _interopRequireDefault(require("./interfaces/jsonrpc"));

var _codec = require("./codec");

Object.keys(_codec).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _codec[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _codec[key];
    }
  });
});

var _create = require("./create");

Object.keys(_create).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _create[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _create[key];
    }
  });
});

var _index = require("./index.types");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});

var _metadata = require("./metadata");

Object.keys(_metadata).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _metadata[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _metadata[key];
    }
  });
});

var _typesCreate = require("@polkadot/types-create");

var _PortableRegistry = require("./metadata/PortableRegistry");

var _packageInfo = require("./packageInfo");

var _StorageKey = require("./primitive/StorageKey");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }