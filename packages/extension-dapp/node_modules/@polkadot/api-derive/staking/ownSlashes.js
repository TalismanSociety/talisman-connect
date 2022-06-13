// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { combineLatest, map, of } from 'rxjs';
import { firstMemo, memo } from "../util/index.js";
import { erasHistoricApplyAccount } from "./util.js";
export function _ownSlashes(instanceId, api) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return memo(instanceId, (accountId, eras, _withActive) => eras.length ? combineLatest([combineLatest(eras.map(e => api.query.staking.validatorSlashInEra(e, accountId))), combineLatest(eras.map(e => api.query.staking.nominatorSlashInEra(e, accountId)))]).pipe(map(([vals, noms]) => eras.map((era, index) => ({
    era,
    total: vals[index].isSome ? vals[index].unwrap()[1] : noms[index].unwrapOrDefault()
  })))) : of([]));
}
export const ownSlash = firstMemo((api, accountId, era) => api.derive.staking._ownSlashes(accountId, [era], true));
export const ownSlashes = erasHistoricApplyAccount('_ownSlashes');