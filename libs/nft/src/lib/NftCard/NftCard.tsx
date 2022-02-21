import { ReactElement, ReactNode } from 'react';
import { NftElement } from '../../types';
import styles from './NftCard.module.css';

export interface NftCardProps {
  header: ReactElement<NftElement>;
  description: ReactNode;
}

export function NftCard(props: NftCardProps) {
  const { header, description } = props;
  return (
    <div className={styles['card-root']}>
      {header}
      {description}
    </div>
  );
}

export default NftCard;
