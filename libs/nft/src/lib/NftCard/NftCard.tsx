import { NftElement } from '../../types';
import Card from '../Card/Card';
import { collectibleUrl } from '../fetchers/rmrk1-fetcher';
import NftContentType from '../NftContentType/NftContentType';
import NftDescription from '../NftDescription/NftDescription';
import NftPreview from '../NftPreview/NftPreview';
import styles from './NftCard.module.css';

export function NftCard(props: NftElement) {
  const { nft } = props;
  return (
    <a
      href={collectibleUrl(nft.id)}
      className={styles['nft-link']}
      target="_blank"
      rel="noreferrer noopener"
    >
      <Card
        header={<NftPreview nft={nft} />}
        description={
          <div className={styles['nft-card-description']}>
            <NftDescription nft={nft} />
            <NftContentType nft={nft} />
          </div>
        }
      />
    </a>
  );
}

export default NftCard;
