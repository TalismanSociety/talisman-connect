import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { toWeb2Url } from '../fetchers/rmrk1-fetcher';

export function useNftMetadata(metadataUrl: string) {
  const url = toWeb2Url(metadataUrl);
  const { data, error } = useSWR(metadataUrl ? url : null, fetcher);
  return {
    nftMetadata: data,
    isLoading: url && !error && !data,
    error,
  };
}

export default useNftMetadata;
