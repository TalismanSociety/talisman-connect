import {
  AccountProps,
  BaseDotsamaWallet,
  getWalletBySource,
  getWallets,
  Wallet,
} from '@talisman/wallets';
import { useState } from 'react';
import Modal, { ModalProps } from '../../lib/Modal/Modal';
import styles from './WalletSelect.module.css';

/* eslint-disable-next-line */
export interface WalletSelectProps {}

function WalletSelectModal(props: ModalProps) {
  return <Modal className={styles['modal-overrides']} {...props} />;
}

export function WalletSelect(props: WalletSelectProps) {
  const [supportedWallets, setWallets] = useState<Wallet[]>();
  const [selectedWallet, setSelectedWallet] = useState<Wallet>();
  const [accounts, setAccounts] = useState<AccountProps[] | undefined>();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>Welcome to WalletSelect!</h1>
      <button
        onClick={() => {
          setWallets(getWallets());
          setIsOpen(true);
        }}
      >
        Connect wallet
      </button>
      <WalletSelectModal
        handleClose={() => setIsOpen(false)}
        isOpen={isOpen && !selectedWallet}
      >
        {supportedWallets?.map((wallet) => {
          return (
            <div key={wallet.extensionName}>
              <button
                onClick={() => {
                  setSelectedWallet(wallet);
                  wallet.subscribeAccounts((accounts) => {
                    setAccounts(accounts);
                  });
                }}
              >
                {wallet.title}
              </button>
            </div>
          );
        })}
      </WalletSelectModal>
      <WalletSelectModal
        handleClose={() => {
          setIsOpen(false);
          setSelectedWallet(undefined);
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
              <div key={`${account.source}-${account.address}`}>
                <span>{account.source}</span>
                <span>{account.address}</span>
                <button
                  onClick={async () => {
                    try {
                      const payload = 'dummy message';
                      const signer = account.wallet.signer;
                      // Example signing
                      const { signature } = await signer.signRaw({
                        type: 'payload',
                        data: payload,
                        address: account.address,
                      });
                    } catch (err) {
                      console.log(`>>> err`, err);
                    }
                  }}
                >
                  Sign
                </button>
              </div>
            );
          })}
      </WalletSelectModal>
    </div>
  );
}

export default WalletSelect;
