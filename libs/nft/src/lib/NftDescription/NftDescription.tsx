import { NftElement } from '../../types';
import styles from './NftDescription.module.css';

export function NftDescription(props: NftElement) {
  const { nft } = props;
  return (
    <div className={styles['nft-description-root']}>
      <div className={`${styles.truncate} ${styles['description-title']}`}>
        {nft.collection?.name}
      </div>
      <div className={styles.truncate}>{nft.name}</div>
    </div>
  );
}

export default NftDescription;
