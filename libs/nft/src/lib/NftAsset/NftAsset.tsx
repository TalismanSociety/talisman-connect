import { DualRingLoader } from '@talisman-connect/ui';
import { MediaHTMLAttributes } from 'react';
import { NftElement } from '../../types';
import useNftMetadata, { toWeb2Url } from '../useNftMetadata/useNftMetadata';
import './NftAsset.module.css';

export interface NftAssetProps
  extends MediaHTMLAttributes<HTMLMediaElement>,
    NftElement {}

export function NftAsset(props: NftAssetProps) {
  const { metadataUrl, LoaderComponent, FallbackComponent, ...mediaProps } =
    props;
  const { nftMetadata, isLoading } = useNftMetadata(metadataUrl);
  const animationUrl = toWeb2Url(nftMetadata?.animation_url);
  // const { contentCategory } = useContentType(animationUrl);
  const contentCategory: string | undefined = 'blah';

  if (!animationUrl) {
    return null;
  }

  if (isLoading) {
    return LoaderComponent || <DualRingLoader />;
  }

  switch (contentCategory) {
    case 'audio':
      return <audio controls src={animationUrl} {...mediaProps} />;
    case 'video':
      return <video controls src={animationUrl} {...mediaProps} />;
    default:
      // TODO: Add default FallbackComponent
      return FallbackComponent || null;
  }
}

export default NftAsset;
