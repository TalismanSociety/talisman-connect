import { encodeAddress } from '@polkadot/keyring';

interface FetcherURL {
  address: string;
}

export function collectibleUrl(id: string) {
  return `https://singular.rmrk.app/collectibles/${id}`;
}

export function fetchUrl({ address }: FetcherURL) {
  try {
    const kusamaAddress = encodeAddress(address, 2);
    return `https://singular.rmrk.app/api/rmrk1/account/${kusamaAddress}`;
  } catch (err) {
    return null;
  }
}
