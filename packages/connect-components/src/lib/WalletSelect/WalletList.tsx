import { Wallet } from '@talismn/connect-wallets';
import { ReactComponent as ChevronRightIcon } from '../../assets/icons/chevron-right.svg';
import { ListWithClickProps } from './types';
import styles from './WalletSelect.module.css';

export function WalletList(props: ListWithClickProps<Wallet>) {
  const { items, onClick } = props;
  if (!items) {
    return null;
  }
  return (
    <>
      {items.map((wallet) => {
        return (
          <button
            key={wallet.extensionName}
            className={styles['row-button']}
            onClick={() => onClick?.(wallet)}
          >
            <span className={styles['flex']}>
              <img
                src={wallet.logo.src}
                alt={wallet.logo.alt}
                width={32}
                height={32}
              />
              {wallet.title}
            </span>
            <ChevronRightIcon />
          </button>
        );
      })}
    </>
  );
}
