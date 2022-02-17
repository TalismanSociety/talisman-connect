import useContentType from '../useContentType/useContentType';
import useNftMetadata, { toWeb2Url } from '../useNftMetadata/useNftMetadata';
import './NftImage.module.css';

export interface NftImageProps {
  metadataUrl: string;
}

function NftAsset(props: NftImageProps) {
  const { metadataUrl } = props;
  const { nftMetadata, isLoading, error } = useNftMetadata(metadataUrl);
  const animationUrl = toWeb2Url(nftMetadata?.animation_url);
  const { contentType = '' } = useContentType(animationUrl);

  if (isLoading) {
    return <>Loading NFT Asset...</>;
  }

  const [type] = contentType?.split('/') as string[];

  console.log(`>>> aaaa`, type);

  switch (type) {
    case 'audio':
      return <audio controls src={animationUrl} />;
    case 'video':
      return <video controls src={animationUrl} />;
    default:
      return null;
  }
}

export function NftImage(props: NftImageProps) {
  const { metadataUrl } = props;
  const { nftMetadata, isLoading, error } = useNftMetadata(metadataUrl);
  const imageUrl = toWeb2Url(nftMetadata?.image);

  return (
    <>
      {isLoading && <span>Loading NFT Metadata...</span>}
      {!isLoading && error && <span>Error...</span>}
      {!isLoading && (
        <img
          src={imageUrl}
          alt="TODO: NFT Name"
          width="100%"
          height="auto"
          loading="lazy"
        />
      )}
      <NftAsset {...props} />
    </>
  );
}

export default NftImage;
