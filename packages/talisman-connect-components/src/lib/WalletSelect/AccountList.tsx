import { WalletAccount } from '@talisman-connect/wallets';
import { ReactComponent as ChevronRightIcon } from '../../assets/icons/chevron-right.svg';
import styles from './WalletSelect.module.css';
import { ListWithClickProps } from './types';
import { truncateMiddle } from '@talisman-connect/ui';

export function AccountList(props: ListWithClickProps<WalletAccount>) {
  const { items, onClick } = props;
  if (!items) {
    return null;
  }
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {items?.map((account) => {
        return (
          <button
            key={`${account.source}-${account.address}`}
            className={styles['row-button']}
            onClick={() => onClick?.(account)}
          >
            <span style={{ textAlign: 'left' }}>
              <div>{account.name}</div>
              <div style={{ fontSize: 'small', opacity: 0.5 }}>
                {truncateMiddle(account.address)}
              </div>
            </span>
            <ChevronRightIcon />
          </button>
        );
      })}
    </>
  );
}
