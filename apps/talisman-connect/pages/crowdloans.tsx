import { truncateMiddle, useLocalStorage } from '@talisman-connect/components';
import { getWalletBySource } from '@talisman-connect/wallets';
import Link from 'next/link';
import { useState } from 'react';
import './crowdloans.module.css';

/* eslint-disable-next-line */
export interface CrowdloansProps {}

export function Crowdloans(props: CrowdloansProps) {
  const [result, setResult] = useState();
  const [name] = useLocalStorage('talisman-connect/account.name');
  const [address] = useLocalStorage('talisman-connect/account.address');
  const [source] = useLocalStorage('talisman-connect/account.source');
  return (
    <div>
      <Link href="/">Home</Link>
      <button
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
