import { Wallet } from '@talismn/connect-wallets';
import { ReactComponent as ChevronRightIcon } from '../../assets/icons/chevron-right.svg';
import { ReactComponent as Download } from '../../assets/icons/download.svg';
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
            className={wallet.installed || wallet.extensionName == "talisman" ? styles['row-button'] : styles['row-button-unavailable']}
            onClick={
              wallet.installed ? () => onClick?.(wallet) : !wallet.installed && wallet.extensionName === "talisman" ? () => window.open(wallet.installUrl, '_blank', 'noopener,noreferrer') : null
            }
          >
            <span className={styles['flex']}>
              <img
                src={wallet.logo.src}
                alt={wallet.logo.alt}
                width={32}
                height={32}
              />
              {!wallet.installed ? "Get " : ""}{wallet.title}
            </span>
            { wallet.installed ? <ChevronRightIcon /> : !wallet.installed && wallet.extensionName === "talisman" ? <Download /> : "Not Installed"}
          </button>
        );
      })}
    </>
  );
}
