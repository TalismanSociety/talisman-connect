"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.proposals = exports.proposalHashes = exports.proposalCount = exports.proposal = exports.prime = exports.members = exports.hasProposals = void 0;

var _collective = require("../collective");

// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
const members = (0, _collective.members)('membership');
exports.members = members;
const hasProposals = (0, _collective.hasProposals)('membership');
exports.hasProposals = hasProposals;
const proposal = (0, _collective.proposal)('membership');
exports.proposal = proposal;
const proposalCount = (0, _collective.proposalCount)('membership');
exports.proposalCount = proposalCount;
const proposalHashes = (0, _collective.proposalHashes)('membership');
exports.proposalHashes = proposalHashes;
const proposals = (0, _collective.proposals)('membership');
exports.proposals = proposals;
const prime = (0, _collective.prime)('membership');
exports.prime = prime;