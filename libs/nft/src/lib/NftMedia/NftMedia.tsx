import { DualRingLoader } from '@talisman-connect/ui';
import { MediaHTMLAttributes } from 'react';
import { NftElement } from '../../types';
import PlaceCenter from '../PlaceCenter/PlaceCenter';
import useContentType from '../useContentType/useContentType';
import useNftMetadata, { toWeb2Url } from '../useNftMetadata/useNftMetadata';
import './NftMedia.module.css';

export interface NftMediaProps
  extends MediaHTMLAttributes<HTMLMediaElement>,
    NftElement {}

export function NftMedia(props: NftMediaProps) {
  const { nft, LoaderComponent, FallbackComponent, ...mediaProps } = props;
  const metadataUrl = nft.metadata;
  const { nftMetadata, isLoading } = useNftMetadata(metadataUrl);
  const animationUrl = toWeb2Url(nftMetadata?.animation_url);
  const { contentCategory } = useContentType(animationUrl);

  if (!animationUrl) {
    return null;
  }
  if (isLoading) {
    return <PlaceCenter>{LoaderComponent || <DualRingLoader />}</PlaceCenter>;
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

export default NftMedia;
