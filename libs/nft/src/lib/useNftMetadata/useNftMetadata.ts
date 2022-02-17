import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';

export function toWeb2Url(metadataUrl: string) {
  return metadataUrl?.replace('ipfs://', 'https://rmrk.mypinata.cloud/');
}

export function useNftMetadata(metadataUrl: string) {
  const { data, error } = useSWR(
    metadataUrl ? toWeb2Url(metadataUrl) : null,
    fetcher
  );
  return {
    nftMetadata: data,
    isLoading: !error && !data,
    error,
  };
}

export default useNftMetadata;
