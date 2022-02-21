import { DualRingLoader } from '@talisman-connect/ui';
import { cloneElement, ImgHTMLAttributes } from 'react';
import { NftElement } from '../../types';
import PlaceCenter from '../PlaceCenter/PlaceCenter';
import useNftMetadata, { toWeb2Url } from '../useNftMetadata/useNftMetadata';
import styles from './NftImage.module.css';

export interface NftImageProps
  extends ImgHTMLAttributes<HTMLImageElement>,
    NftElement {}

export function NftImage(props: NftImageProps) {
  const { nft, LoaderComponent, ErrorComponent, ...imageProps } = props;
  const metadataUrl = nft.metadata;
  const { nftMetadata, isLoading, error } = useNftMetadata(metadataUrl);
  const imageUrl = toWeb2Url(nftMetadata?.image);

  if (isLoading) {
    return (
      <PlaceCenter className={styles['nft-image-root']}>
        {LoaderComponent || <DualRingLoader style={{ height: 'unset' }} />}
      </PlaceCenter>
    );
  }
  if (error) {
    return (
      <PlaceCenter className={styles['nft-image-root']}>
        {ErrorComponent ? (
          cloneElement(ErrorComponent, {
            error,
          })
        ) : (
          <span>{error?.message}</span>
        )}
      </PlaceCenter>
    );
  }
  return (
    <img
      src={imageUrl}
      alt={nftMetadata?.name}
      loading="lazy"
      className={styles['nft-image-root']}
      {...imageProps}
    />
  );
}

export default NftImage;
