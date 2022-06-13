// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { map, of } from 'rxjs';
import { isFunction } from '@polkadot/util';
import { memo } from "../util/index.js";

function parseFlags(address, [electionsMembers, councilMembers, technicalCommitteeMembers, societyMembers, sudoKey]) {
  const addrStr = address && address.toString();

  const isIncluded = id => id.toString() === addrStr;

  return {
    isCouncil: ((electionsMembers === null || electionsMembers === void 0 ? void 0 : electionsMembers.map(r => Array.isArray(r) ? r[0] : r.who)) || councilMembers || []).some(isIncluded),
    isSociety: (societyMembers || []).some(isIncluded),
    isSudo: (sudoKey === null || sudoKey === void 0 ? void 0 : sudoKey.toString()) === addrStr,
    isTechCommittee: (technicalCommitteeMembers || []).some(isIncluded)
  };
}

export function _flags(instanceId, api) {
  return memo(instanceId, () => {
    var _ref, _api$query$council, _api$query$technicalC, _api$query$society, _api$query$sudo;

    const results = [undefined, [], [], [], undefined];
    const calls = [(_ref = api.query.phragmenElection || api.query.electionsPhragmen || api.query.elections) === null || _ref === void 0 ? void 0 : _ref.members, (_api$query$council = api.query.council) === null || _api$query$council === void 0 ? void 0 : _api$query$council.members, (_api$query$technicalC = api.query.technicalCommittee) === null || _api$query$technicalC === void 0 ? void 0 : _api$query$technicalC.members, (_api$query$society = api.query.society) === null || _api$query$society === void 0 ? void 0 : _api$query$society.members, (_api$query$sudo = api.query.sudo) === null || _api$query$sudo === void 0 ? void 0 : _api$query$sudo.key];
    const filtered = calls.filter(c => c);

    if (!filtered.length) {
      return of(results);
    }

    return api.queryMulti(filtered).pipe(map(values => {
      let resultIndex = -1;

      for (let i = 0; i < calls.length; i++) {
        if (isFunction(calls[i])) {
          results[i] = values[++resultIndex];
        }
      }

      return results;
    }));
  });
}
/**
 * @name info
 * @description Returns account membership flags
 */

export function flags(instanceId, api) {
  return memo(instanceId, address => api.derive.accounts._flags().pipe(map(r => parseFlags(address, r))));
}