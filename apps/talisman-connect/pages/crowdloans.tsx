import { getWalletBySource } from '@talisman-connect/wallets';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './crowdloans.module.css';

/* eslint-disable-next-line */
export interface CrowdloansProps {}

export function Crowdloans(props: CrowdloansProps) {
  const [result, setResult] = useState();
  return (
    <div>
      <Link href="/">Home</Link>
      <button
        onClick={async () => {
          const address = localStorage.getItem('selectedAccountAddress');
          const source = localStorage.getItem('selectedAccountSource');
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
        Sign
      </button>
      <div>Signature: {result}</div>
    </div>
  );
}

export default Crowdloans;
