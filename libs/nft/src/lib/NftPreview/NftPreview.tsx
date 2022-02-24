import { DualRingLoader } from '@talisman-connect/ui';
import {
  cloneElement,
  ImgHTMLAttributes,
  MediaHTMLAttributes,
  useEffect,
} from 'react';
import { NftElement } from '../../types';
import { toWeb2Url } from '../fetchers/rmrk1-fetcher';
import PlaceCenter from '../PlaceCenter/PlaceCenter';
import useNftMetadata from '../useNftMetadata/useNftMetadata';
import styles from './NftPreview.module.css';

export interface NftPreviewProps
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

interface ImgPreviewProps extends ImgHTMLAttributes<HTMLImageElement> {
  contentCategory: 'image' | 'audio';
}

interface VideoPreviewProps extends MediaHTMLAttributes<HTMLMediaElement> {
  contentCategory: 'video';
}

interface ModelPrevierProps {
  contentCategory: 'model';
}

type MediaPreviewProps =
  | ImgPreviewProps
  | VideoPreviewProps
  | ModelPrevierProps;

function MediaPreview(props: MediaPreviewProps) {
  const { contentCategory, ...mediaElementProps } = props;
  const { alt, src } = mediaElementProps as ImgHTMLAttributes<HTMLImageElement>;
  console.log(`>>> aaa`, contentCategory);

  useEffect(() => {
    (async () => {
      if (window) {
        await import('@google/model-viewer/dist/model-viewer.js');
      }
    })();
  });

  const modelProps = {
    src,
    alt,
    autoplay: 'true',
    'camera-controls': 'true',
    'shadow-intensity': '1',
    'ar-status': 'not-presenting',
    ...mediaElementProps,
  };

  switch (contentCategory) {
    case 'model':
      return (
        <model-viewer
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
          }}
          {...modelProps}
        />
      );
    case 'video':
      return (
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="metadata"
          controlsList="nodownload"
          {...(mediaElementProps as MediaHTMLAttributes<HTMLMediaElement>)}
        />
      );
    default:
      return (
        <img
          alt={alt}
          loading="lazy"
          {...(mediaElementProps as ImgHTMLAttributes<HTMLImageElement>)}
        />
      );
  }
}

export function NftPreview(props: NftPreviewProps) {
  const { nft, LoaderComponent, ErrorComponent, ...imageProps } = props;
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
      <MediaPreview
        contentCategory={contentCategory}
        src={src}
        alt={name}
        className={styles['nft-image-content']}
        {...imageProps}
      />
    </div>
  );
}

export default NftPreview;
