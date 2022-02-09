import {
  truncateMiddle,
  useLocalStorage,
  WalletSelect,
} from '@talisman-connect/components';
import { BaseWalletError } from '@talisman-connect/wallets';
import Link from 'next/link';
import { useState } from 'react';
import styles from './index.module.css';

export function Index() {
  const [error, setError] = useState<Error>();
  const [address, setAddress] = useLocalStorage(
    'talisman-connect/account.address'
  );
  const [name, setName] = useLocalStorage('talisman-connect/account.name');
  const [source, setSource] = useLocalStorage(
    'talisman-connect/account.source'
  );

  return (
    <div className={styles.page}>
      <Link href="/crowdloans">Go to Crowdloans</Link>
      <WalletSelect
        // showAccountsList
        triggerComponent={
          <button
            style={{ border: '1px solid black', padding: '1rem 1.5rem' }}
            onClick={(wallets) => {
              console.log(`>>> wallets`, wallets);
              setError(null);
            }}
          >
            Connect wallet
          </button>
        }
        onWalletSelected={(wallet) => {
          console.log(`>>> selected wallet`, wallet);
          setSource(wallet.extensionName);
        }}
        onUpdatedAccounts={(accounts) => {
          console.log(`>>> accounts`, accounts);
        }}
        onError={(err: Error) => {
          setError(err);
          console.log(
            `>>> err`,
            err?.name,
            err?.message,
            (err as BaseWalletError)?.wallet
          );
        }}
        // onAccountSelected={(account) => {
        //   console.log(`>>> account selected`, account);
        //   setAddress(account.address);
        //   setName(account.name);
        //   setSource(account.source);
        // }}
      />
      <div>Name: {name}</div>
      <div>Address: {truncateMiddle(address)}</div>
      <div>Source: {source}</div>
      {error && <div style={{ color: 'red' }}>{error.message}</div>}
    </div>
  );
}

export default Index;
