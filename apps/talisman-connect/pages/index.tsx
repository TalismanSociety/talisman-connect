import { WalletSelect } from '@talisman-connect/components';
import Link from 'next/link';
import styles from './index.module.css';

export function Index() {
  return (
    <div className={styles.page}>
      <Link href="/crowdloans">Go to Crowdloans</Link>
      <WalletSelect
        onAccountSelected={(account) => {
          console.log(`>>> account selected`, account);
        }}
      />
    </div>
  );
}

export default Index;
