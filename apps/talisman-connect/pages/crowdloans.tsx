import { truncateMiddle, WalletSelect } from '@talisman-connect/components';
import { useLocalStorage } from '@talisman-connect/ui';
import { getWalletBySource } from '@talisman-connect/wallets';
import Link from 'next/link';
import { useState } from 'react';
import './crowdloans.module.css';

/* eslint-disable-next-line */
export interface CrowdloansProps {}

export function Crowdloans(props: CrowdloansProps) {
  const [result, setResult] = useState();
  const [name, setName] = useLocalStorage('talisman-connect/account.name');
  const [address, setAddress] = useLocalStorage(
    'talisman-connect/account.address'
  );
  const [source, setSource] = useLocalStorage(
    'talisman-connect/account.source'
  );
  return (
    <div>
      <Link href="/">Home</Link>
      <WalletSelect
        showAccountsList
        triggerComponent={
          <button
            style={{ border: '1px solid black', padding: '1rem 1.5rem' }}
            onClick={(wallets) => {
              console.log(`>>> wallets`, wallets);
            }}
          >
            Choose wallet
          </button>
        }
        onAccountSelected={(account) => {
          console.log(`>>> account selected`, account);
          setAddress(account.address);
          setName(account.name);
          setSource(account.source);
        }}
      />
      <button
        style={{ border: '1px solid black', padding: '1rem 1.5rem' }}
        onClick={async () => {
          const wallet = getWalletBySource(source);
          try {
            const { signature } = await wallet.signer.signRaw({
              type: 'payload',
              data: 'dummy message',
              address: address,
            });

            setResult(signature);

            console.log(`>>> signature`, signature);
          } catch (err) {
            console.log(`>>> err`, err);
          }
        }}
      >
        Sign Dummy Message
      </button>
      <div>Name: {name}</div>
      <div>Address: {truncateMiddle(address)}</div>
      <div>Source: {source}</div>
      <div>Signature: {truncateMiddle(result, 10, 10)}</div>
    </div>
  );
}

export default Crowdloans;
