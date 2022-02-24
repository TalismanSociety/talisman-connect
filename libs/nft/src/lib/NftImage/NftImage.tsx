import { DualRingLoader } from '@talisman-connect/ui';
import { cloneElement, ImgHTMLAttributes, MediaHTMLAttributes } from 'react';
import { NftElement } from '../../types';
import { toWeb2Url } from '../fetchers/rmrk1-fetcher';
import PlaceCenter from '../PlaceCenter/PlaceCenter';
import useNftMetadata from '../useNftMetadata/useNftMetadata';
import styles from './NftImage.module.css';

export interface NftImageProps
  extends ImgHTMLAttributes<HTMLImageElement>,
    NftElement {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useNftAsset(nft: any) {
  const metadataUrl = nft.metadata;
  const contentType = nft.metadata_content_type;
  const image = nft.metadata_image;
  // If any of `metadata_content_type` or `metadata_image` is missing,
  // fallback to calling the `metadata` url to get image or `animation_url`.
  // Otherwise, no need to do an extra call.
  const url = !contentType || !image ? metadataUrl : null;
  const { nftMetadata, ...restMetadata } = useNftMetadata(url);
  const animationUrl = nftMetadata?.animation_url;
  const name = nft?.name || nft?.metadata_name || nftMetadata?.name;
  const [contentCategory, contentExtension] = contentType?.split('/') || [];

  return {
    name,
    imageUrl: toWeb2Url(image),
    animationUrl: toWeb2Url(animationUrl),
    contentCategory,
    contentExtension,
    ...restMetadata,
  };
}

interface ImgElementProps extends ImgHTMLAttributes<HTMLImageElement> {
  contentCategory: 'image';
}

interface PlayableElementProps extends MediaHTMLAttributes<HTMLMediaElement> {
  contentCategory: 'audio' | 'video';
}

type MediaElementProps = ImgElementProps | PlayableElementProps;

function MediaElement(props: MediaElementProps) {
  const { contentCategory, ...mediaElementProps } = props;
  const { alt } = mediaElementProps as ImgHTMLAttributes<HTMLImageElement>;
  switch (contentCategory) {
    case 'image':
      return (
        <img
          alt={alt}
          loading="lazy"
          {...(mediaElementProps as ImgHTMLAttributes<HTMLImageElement>)}
        />
      );
    case 'audio':
      return (
        <audio
          playsInline
          {...(mediaElementProps as MediaHTMLAttributes<HTMLMediaElement>)}
        />
      );
    case 'video':
      return (
        <video
          loop
          playsInline
          controlsList="nodownload"
          {...(mediaElementProps as MediaHTMLAttributes<HTMLMediaElement>)}
        />
      );
    default:
      return null;
  }
}

export function NftImage(props: NftImageProps) {
  const { nft, LoaderComponent, ErrorComponent, ...imageProps } = props;
  // const metadataUrl = nft.metadata;
  // const contentType = nft.metadata_content_type;
  // const { nftMetadata, isLoading, error } = useNftMetadata(metadataUrl);
  const { contentCategory, name, imageUrl, animationUrl, isLoading, error } =
    useNftAsset(nft);
  const src = imageUrl || animationUrl;

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
    <div className={styles['nft-image-root']}>
      <MediaElement
        contentCategory={contentCategory}
        src={src}
        alt={name}
        className={styles['nft-image-content']}
        {...imageProps}
      />
      {/* <img
        src={imageUrl}
        alt={nftMetadata?.name}
        loading="lazy"
        className={styles['nft-image-content']}
        {...imageProps}
      /> */}
    </div>
  );
}

export default NftImage;
