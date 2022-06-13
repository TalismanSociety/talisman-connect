"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasProposals = hasProposals;
exports.proposal = proposal;
exports.proposalHashes = exports.proposalCount = void 0;
exports.proposals = proposals;

var _rxjs = require("rxjs");

var _util = require("@polkadot/util");

var _util2 = require("../util");

var _helpers = require("./helpers");

// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
function parse(api, _ref) {
  let [hashes, proposals, votes] = _ref;
  return proposals.map((o, index) => ({
    hash: api.registry.createType('Hash', hashes[index]),
    proposal: o && o.isSome ? o.unwrap() : null,
    votes: votes[index].unwrapOr(null)
  }));
}

function _proposalsFrom(api, query, hashes) {
  return ((0, _util.isFunction)(query === null || query === void 0 ? void 0 : query.proposals) && hashes.length ? (0, _rxjs.combineLatest)([(0, _rxjs.of)(hashes), // this should simply be api.query[section].proposalOf.multi<Option<Proposal>>(hashes),
  // however we have had cases on Edgeware where the indices have moved around after an
  // upgrade, which results in invalid on-chain data
  query.proposalOf.multi(hashes).pipe((0, _rxjs.catchError)(() => (0, _rxjs.of)(hashes.map(() => null)))), query.voting.multi(hashes)]) : (0, _rxjs.of)([[], [], []])).pipe((0, _rxjs.map)(r => parse(api, r)));
}

function hasProposals(section) {
  return (0, _helpers.withSection)(section, query => () => (0, _rxjs.of)((0, _util.isFunction)(query === null || query === void 0 ? void 0 : query.proposals)));
}

function proposals(section) {
  return (0, _helpers.withSection)(section, (query, api) => () => api.derive[section].proposalHashes().pipe((0, _rxjs.switchMap)(all => _proposalsFrom(api, query, all))));
}

function proposal(section) {
  return (0, _helpers.withSection)(section, (query, api) => hash => (0, _util.isFunction)(query === null || query === void 0 ? void 0 : query.proposals) ? (0, _util2.firstObservable)(_proposalsFrom(api, query, [hash])) : (0, _rxjs.of)(null));
}

const proposalCount = (0, _helpers.callMethod)('proposalCount', null);
exports.proposalCount = proposalCount;
const proposalHashes = (0, _helpers.callMethod)('proposals', []);
exports.proposalHashes = proposalHashes;