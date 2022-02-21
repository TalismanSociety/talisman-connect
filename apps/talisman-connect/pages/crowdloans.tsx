import { WalletSelect } from '@talisman-connect/components';
import { truncateMiddle, useLocalStorage } from '@talisman-connect/ui';
import { getWalletBySource } from '@talisman-connect/wallets';
import {
  NftCard,
  NftImage,
  NftMedia,
  useNftsByAddress,
} from '@talisman-connect/nft';
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

  const { nfts, isLoading } = useNftsByAddress(address);

  return (
    <div>
      <div>
        <Link href="/">Home</Link>
      </div>
      <h2>WalletSelect with showAccountsList</h2>
      <WalletSelect
        dappName="Some other dapp"
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
      <p>Name: {name}</p>
      <div>Address: {truncateMiddle(address)}</div>
      <div>Source: {source}</div>

      <h2>Example Signing</h2>
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
      <p>Signature: {truncateMiddle(result, 10, 10)}</p>

      <h2>NFTs</h2>
      {isLoading && <span>Loading NFTs...</span>}
      {!isLoading && nfts?.length === 0 && (
        <span>No NFTs on {truncateMiddle(address)}</span>
      )}
      {!isLoading && (
        <div
          style={{
            display: 'grid',
            gap: '1rem',
          }}
        >
          {nfts?.map((nft) => {
            return (
              <div key={nft.id}>
                <NftCard
                  nft={<NftImage metadataUrl={nft.metadata} />}
                  description={
                    <div style={{ padding: '1rem' }}>
                      <div>Collection name</div>
                      <div>{nft.name}</div>
                    </div>
                  }
                />
                {/* <NftMedia
                metadataUrl={nft.metadata}
                FallbackComponent={
                  <NftImage
                    metadataUrl={nft.metadata}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      maxWidth: '32px',
                      maxHeight: '32px',
                    }}
                  />
                }
              /> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Crowdloans;
