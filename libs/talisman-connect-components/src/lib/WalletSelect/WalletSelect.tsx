import { WalletAccount, getWallets, Wallet } from '@talisman-connect/wallets';
import { useState } from 'react';
import Modal, { ModalProps } from '../../lib/Modal/Modal';
import { ReactComponent as ChevronRightIcon } from '../assets/icons/chevron-right.svg';
import styles from './WalletSelect.module.css';
import { truncateMiddle } from '../../utils/truncateMiddle';

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

function WalletSelectModal(props: ModalProps) {
  return <Modal className={styles['modal-overrides']} {...props} />;
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
      <button
        onClick={() => {
          const wallets = getWallets();
          setWallets(wallets);
          setIsOpen(true);
          if (onWalletConnectOpen) {
            onWalletConnectOpen(wallets);
          }
        }}
      >
        Connect wallet
      </button>
      <WalletSelectModal
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
        {supportedWallets?.map((wallet) => {
          return (
            <button
              key={wallet.extensionName}
              className={styles['row-button']}
              onClick={() => {
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
      </WalletSelectModal>
      <WalletSelectModal
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
        {accounts
          ?.filter(
            (account) => account.source === selectedWallet?.extensionName
          )
          .map((account) => {
            return (
              <button
                key={`${account.source}-${account.address}`}
                className={styles['row-button']}
                onClick={async () => {
                  if (onAccountSelected) {
                    onAccountSelected(account);
                  }
                  setIsOpen(false);
                  setSelectedWallet(undefined);
                  // TODO: Comment here as this is showing an example signing
                  // try {
                  //   const payload = 'dummy message';
                  //   const signer = account.wallet.signer;
                  //   // Example signing
                  //   const { signature } = await signer.signRaw({
                  //     type: 'payload',
                  //     data: payload,
                  //     address: account.address,
                  //   });
                  // } catch (err) {
                  //   console.log(`>>> err`, err);
                  // }
                }}
              >
                {truncateMiddle(account.address, 4, 4)}
                <ChevronRightIcon />
              </button>
            );
          })}
      </WalletSelectModal>
    </div>
  );
}

export default WalletSelect;
