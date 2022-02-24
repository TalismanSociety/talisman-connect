import { encodeAnyAddress } from '../../utils/encodeAnyAddress';

interface FetcherURL {
  address: string;
}

export function collectibleUrl(id: string) {
  return `https://singular.rmrk.app/collectibles/${id}`;
}

export function fetchUrl({ address }: FetcherURL) {
  const kusamaAddress = encodeAnyAddress(address, 2);
  return `https://singular.rmrk.app/api/rmrk1/account/${kusamaAddress}`;
}
