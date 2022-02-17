import { DualRingLoader } from '@talisman-connect/ui';
import { cloneElement, ImgHTMLAttributes } from 'react';
import { NftElement } from '../../types';
import useNftMetadata, { toWeb2Url } from '../useNftMetadata/useNftMetadata';
import './NftImage.module.css';

export interface NftImageProps
  extends ImgHTMLAttributes<HTMLImageElement>,
    NftElement {}

export function NftImage(props: NftImageProps) {
  const { metadataUrl, LoaderComponent, ErrorComponent, ...imageProps } = props;
  const { nftMetadata, isLoading, error } = useNftMetadata(metadataUrl);
  const imageUrl = toWeb2Url(nftMetadata?.image);
  if (isLoading) {
    return LoaderComponent || <DualRingLoader />;
  }
  if (error) {
    return ErrorComponent ? (
      cloneElement(ErrorComponent, {
        error,
      })
    ) : (
      <span>{error?.message}</span>
    );
  }
  return (
    <img
      src={imageUrl}
      alt={nftMetadata?.name}
      loading="lazy"
      {...imageProps}
    />
  );
}

export default NftImage;
