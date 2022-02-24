import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { fetchUrl } from '../fetchers/rmrk1-fetcher';

export function useNftsByAddress(address: string) {
  const url = fetchUrl({ address });
  const { data, error } = useSWR(address ? url : null, fetcher);
  return {
    nfts: data,
    isLoading: url && !error && !data,
    error,
  };
}

export default useNftsByAddress;
