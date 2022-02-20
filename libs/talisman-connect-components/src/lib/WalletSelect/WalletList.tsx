import { Wallet } from '@talisman-connect/wallets';
import { ReactComponent as ChevronRightIcon } from '../../assets/icons/chevron-right.svg';
import { ListWithClickProps } from './types';
import styles from './WalletSelect.module.css';

export function WalletList(props: ListWithClickProps<Wallet>) {
  const { items, onClick, classes } = props;
  if (!items) {
    return null;
  }
  return (
    <>
      {items.map((wallet) => {
        return (
          <button
            key={wallet.extensionName}
            className={`${styles['row-button']} ${classes?.walletRoot || ''}`}
            onClick={() => onClick?.(wallet)}
          >
            <span className={styles['flex']}>
              <img
                className={classes?.walletIcon || ''}
                src={wallet.logo.src}
                alt={wallet.logo.alt}
                width={32}
                height={32}
              />
              <span className={classes?.walletHeader || ''}>
                {wallet.title}
              </span>
            </span>
            <ChevronRightIcon style={{ opacity: 0.5 }} />
          </button>
        );
      })}
    </>
  );
}
