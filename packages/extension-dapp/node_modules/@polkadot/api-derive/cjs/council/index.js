"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  members: true,
  hasProposals: true,
  proposal: true,
  proposalCount: true,
  proposalHashes: true,
  proposals: true,
  prime: true
};
exports.proposals = exports.proposalHashes = exports.proposalCount = exports.proposal = exports.prime = exports.members = exports.hasProposals = void 0;

var _collective = require("../collective");

var _votes = require("./votes");

Object.keys(_votes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _votes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _votes[key];
    }
  });
});

var _votesOf = require("./votesOf");

Object.keys(_votesOf).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _votesOf[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _votesOf[key];
    }
  });
});
// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
const members = (0, _collective.members)('council');
exports.members = members;
const hasProposals = (0, _collective.hasProposals)('council');
exports.hasProposals = hasProposals;
const proposal = (0, _collective.proposal)('council');
exports.proposal = proposal;
const proposalCount = (0, _collective.proposalCount)('council');
exports.proposalCount = proposalCount;
const proposalHashes = (0, _collective.proposalHashes)('council');
exports.proposalHashes = proposalHashes;
const proposals = (0, _collective.proposals)('council');
exports.proposals = proposals;
const prime = (0, _collective.prime)('council');
exports.prime = prime;