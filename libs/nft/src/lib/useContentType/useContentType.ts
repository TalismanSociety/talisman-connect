import useSWR from 'swr';
import { contentTypeFetcher } from '../../utils/contentTypeFetcher';

export function useContentType(url: string) {
  const { data, error } = useSWR(url, contentTypeFetcher);
  return {
    contentType: data,
    error,
    isLoading: !data && !error,
  };
}

export default useContentType;
