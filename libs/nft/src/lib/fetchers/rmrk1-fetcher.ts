import { encodeAddress } from '@polkadot/keyring';

interface FetcherURL {
  address: string;
}

export function fetchUrl({ address }: FetcherURL) {
  const kusamaAddress = encodeAddress(address, 2);
  return `https://singular.rmrk.app/api/rmrk1/account/${kusamaAddress}`;
}
