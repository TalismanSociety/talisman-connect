import { WalletAccount, Wallet } from '@talisman-connect/wallets';
import { useState } from 'react';
import Modal, { ModalProps } from '../../lib/Modal/Modal';
import { ReactComponent as ChevronRightIcon } from '../../assets/icons/chevron-right.svg';
import styles from './WalletSelect.module.css';
import { truncateMiddle } from '../../utils/truncateMiddle';
import WalletConnectButton from '../WalletConnectButton/WalletConnectButton';

export interface WalletSelectProps {
  onWalletConnectOpen?: (wallets: Wallet[]) => unknown;
  onWalletConnectClose?: () => unknown;
  onWalletSelected?: (wallet: Wallet) => unknown;
  onUpdatedAccounts?: (accounts: WalletAccount[]) => unknown;
  onAccountSelected: (account: WalletAccount) => unknown;
}

function NoWalletLink() {
  return (
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        fontSize: 'small',
        opacity: 0.5,
      }}
    >
      I don't have a wallet
    </div>
  );
}

interface ListWithClickProps<T> {
  items: T[] | undefined;
  onClick: (item: T) => unknown;
}

function WalletList(props: ListWithClickProps<Wallet>) {
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
            onClick={() => onClick(wallet)}
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

function AccountList(props: ListWithClickProps<WalletAccount>) {
  const { items, onClick } = props;
  if (!items) {
    return null;
  }
  return (
    <>
      {items.map((account) => {
        return (
          <button
            key={`${account.source}-${account.address}`}
            className={styles['row-button']}
            onClick={() => onClick(account)}
          >
            {truncateMiddle(account.address, 4, 4)}
            <ChevronRightIcon />
          </button>
        );
      })}
    </>
  );
}

export function WalletSelect(props: WalletSelectProps) {
  const {
    onWalletConnectOpen,
    onWalletConnectClose,
    onWalletSelected,
    onUpdatedAccounts,
    onAccountSelected,
  } = props;

  const [supportedWallets, setWallets] = useState<Wallet[]>();
  const [selectedWallet, setSelectedWallet] = useState<Wallet>();
  const [accounts, setAccounts] = useState<WalletAccount[] | undefined>();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <WalletConnectButton
        className={styles['wallet-select-overrides']}
        onClick={(wallets) => {
          setWallets(wallets);
          setIsOpen(true);
          if (onWalletConnectOpen) {
            onWalletConnectOpen(wallets);
          }
        }}
      >
        Connect wallet
      </WalletConnectButton>
      <Modal
        className={styles['wallet-select-overrides']}
        title={'Connect wallet'}
        footer={<NoWalletLink />}
        handleClose={() => {
          setIsOpen(false);
          if (onWalletConnectClose) {
            onWalletConnectClose();
          }
        }}
        isOpen={isOpen && !selectedWallet}
      >
        <WalletList
          items={supportedWallets}
          onClick={(wallet) => {
            setSelectedWallet(wallet);
            if (onWalletSelected) {
              onWalletSelected(wallet);
            }
            wallet.subscribeAccounts((accounts) => {
              setAccounts(accounts);
              if (onUpdatedAccounts) {
                onUpdatedAccounts(accounts);
              }
            });
          }}
        />
      </Modal>
      <Modal
        className={styles['wallet-select-overrides']}
        title={`Select ${selectedWallet?.title} account`}
        handleClose={() => {
          setIsOpen(false);
          setSelectedWallet(undefined);
          if (onWalletConnectClose) {
            onWalletConnectClose();
          }
        }}
        handleBack={() => {
          setSelectedWallet(undefined);
        }}
        isOpen={!!selectedWallet}
      >
        <AccountList
          items={accounts?.filter(
            (account) => account.source === selectedWallet?.extensionName
          )}
          onClick={(account) => {
            if (onAccountSelected) {
              onAccountSelected(account);
            }
            setIsOpen(false);
            setSelectedWallet(undefined);
          }}
        />
      </Modal>
    </div>
  );
}

export default WalletSelect;
