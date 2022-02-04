import { WalletSelect } from '@talisman-connect/components';
import styles from './index.module.css';

export function Index() {
  return (
    <div className={styles.page}>
      <WalletSelect
        onAccountSelected={(account) => {
          console.log(`>>> account selected`, account);
        }}
      />
    </div>
  );
}

export default Index;
