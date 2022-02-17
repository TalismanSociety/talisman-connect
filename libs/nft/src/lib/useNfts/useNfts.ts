import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { fetchUrl } from '../fetchers/rmrk1-fetcher';

export function useNfts(address: string) {
  const { data, error } = useSWR(
    address ? fetchUrl({ address }) : null,
    fetcher
  );
  return {
    nfts: data,
    isLoading: !error && !data,
    error,
  };
}

export default useNfts;
