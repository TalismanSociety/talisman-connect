import {
  truncateMiddle,
  useLocalStorage,
  WalletSelect,
} from '@talisman-connect/components';
import Link from 'next/link';
import { useEffect } from 'react';
import styles from './index.module.css';

export function Index() {
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
        onAccountSelected={(account) => {
          console.log(`>>> account selected`, account);
          setAddress(account.address);
          setName(account.name);
          setSource(account.source);
        }}
      />
      <div>Name: {name}</div>
      <div>Address: {truncateMiddle(address)}</div>
      <div>Source: {source}</div>
    </div>
  );
}

export default Index;
