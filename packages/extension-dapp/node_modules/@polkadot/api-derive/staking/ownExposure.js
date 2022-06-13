// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { combineLatest, map, of } from 'rxjs';
import { firstMemo, memo } from "../util/index.js";
import { erasHistoricApplyAccount } from "./util.js";
export function _ownExposures(instanceId, api) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return memo(instanceId, (accountId, eras, _withActive) => eras.length ? combineLatest([combineLatest(eras.map(e => api.query.staking.erasStakersClipped(e, accountId))), combineLatest(eras.map(e => api.query.staking.erasStakers(e, accountId)))]).pipe(map(([clp, exp]) => eras.map((era, index) => ({
    clipped: clp[index],
    era,
    exposure: exp[index]
  })))) : of([]));
}
export const ownExposure = firstMemo((api, accountId, era) => api.derive.staking._ownExposures(accountId, [era], true));
export const ownExposures = erasHistoricApplyAccount('_ownExposures');