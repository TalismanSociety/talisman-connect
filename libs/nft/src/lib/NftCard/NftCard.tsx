import { ReactElement, ReactNode } from 'react';
import { NftElement } from '../../types';
import styles from './NftCard.module.css';

export interface NftCardProps {
  nft: ReactElement<NftElement>;
  description: ReactNode;
}

export function NftCard(props: NftCardProps) {
  const { nft, description } = props;
  return (
    <div className={styles['card-root']}>
      {nft}
      {description}
    </div>
  );
}

export default NftCard;
