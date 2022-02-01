import { Account, getWallets, Wallet } from '@talisman/wallets';
import { useState } from 'react';
import './WalletSelect.module.css';

/* eslint-disable-next-line */
export interface WalletSelectProps {}

export function WalletSelect(props: WalletSelectProps) {
  const [supportedWallets, setWallets] = useState<Array<Wallet> | undefined>();
  const [accounts, setAccounts] = useState<Array<Account>>();
  return (
    <div>
      <h1>Welcome to WalletSelect!</h1>
      {!supportedWallets && (
        <button onClick={() => setWallets(getWallets())}>Connect wallet</button>
      )}
      {supportedWallets?.map((wallet) => {
        return (
          <div key={wallet.extensionName}>
            <button
              onClick={() => {
                wallet.subscribe((accounts) => {
                  setAccounts(accounts);
                });
              }}
            >
              Connect to {wallet.title}
            </button>
          </div>
        );
      })}
      {accounts?.map((account) => {
        return <div key={account.address}>{account.address}</div>;
      })}
    </div>
  );
}

export default WalletSelect;
