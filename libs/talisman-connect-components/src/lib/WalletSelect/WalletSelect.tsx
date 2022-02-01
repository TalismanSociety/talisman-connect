import { getWallets } from '@talisman/wallets';
import { Wallet } from 'libs/wallets/src/lib/base-wallet';
import { useState } from 'react';
import './WalletSelect.module.css';

/* eslint-disable-next-line */
export interface WalletSelectProps {}

export function WalletSelect(props: WalletSelectProps) {
  const [supportedWallets, setWallets] = useState<Array<Wallet> | undefined>();
  // const supportedWallets = getWallets();
  return (
    <div>
      <h1>Welcome to WalletSelect!</h1>
      {!supportedWallets && (
        <button
          onClick={() => {
            setWallets(getWallets());
          }}
        >
          Connect wallet
        </button>
      )}
      {supportedWallets?.map((wallet) => {
        return (
          <div key={wallet.extensionName}>
            <button
              onClick={() => {
                wallet.subscribe((accounts) => {
                  console.log(`>>> accounts`, accounts);
                });
              }}
            >
              Connect to {wallet.title}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default WalletSelect;
