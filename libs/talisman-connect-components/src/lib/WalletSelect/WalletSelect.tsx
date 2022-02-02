import { getWallets } from '@talisman/wallets';
import { useState } from 'react';
import Modal, { ModalProps } from '../../lib/Modal/Modal';
import styles from './WalletSelect.module.css';

/* eslint-disable-next-line */
export interface WalletSelectProps {}

function WalletSelectModal(props: ModalProps) {
  return <Modal className={styles['dark-theme']} {...props} />;
}

export function WalletSelect(props: WalletSelectProps) {
  const [supportedWallets, setWallets] = useState<Wallet[] | undefined>();
  const [accounts, setAccounts] = useState<Account[] | undefined>();

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
        isOpen={isOpen && !accounts}
      >
        {supportedWallets?.map((wallet) => {
          return (
            <div key={wallet.extensionName}>
              <button
                onClick={() =>
                  wallet.subscribeAccounts((accounts: Account[]) => {
                    setAccounts(accounts);
                  })
                }
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
          setAccounts(undefined);
        }}
        isOpen={!!accounts}
      >
        {accounts?.map((account) => {
          return (
            <div key={account.address}>
              <span>{account.address}</span>
              <button
                onClick={async () => {
                  if (!account.wallet?.sign) {
                    return;
                  }
                  const address = account.address;
                  const payload = 'dummy message';
                  const signature = await account.wallet?.sign(
                    address,
                    payload
                  );
                  console.log(
                    `>>> onclick sign`,
                    signature,
                    account.wallet.extension
                  );
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
