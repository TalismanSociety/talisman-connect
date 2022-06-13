"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ScProvider = require("./ScProvider");

Object.keys(_ScProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ScProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ScProvider[key];
    }
  });
});