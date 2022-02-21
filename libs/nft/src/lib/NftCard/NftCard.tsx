import { NftElement } from '../../types';
import Card from '../Card/Card';
import NftContentType from '../NftContentType/NftContentType';
import NftDescription from '../NftDescription/NftDescription';
import NftImage from '../NftImage/NftImage';
import styles from './NftCard.module.css';

export function NftCard(props: NftElement) {
  const { nft } = props;
  return (
    <Card
      header={<NftImage nft={nft} />}
      description={
        <div className={styles['nft-card-description']}>
          <NftDescription nft={nft} />
          <NftContentType nft={nft} />
        </div>
      }
    />
  );
}

// onclick contentype
// <NftMedia
//   nft={nft}
//   FallbackComponent={
//     <NftImage
//       nft={nft}
//       style={{
//         objectFit: 'cover',
//         objectPosition: 'center',
//         maxWidth: '32px',
//         maxHeight: '32px',
//       }}
//     />
//   }
// />

export default NftCard;
