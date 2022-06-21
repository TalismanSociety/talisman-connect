import { WalletSelect, WalletSelectButton } from '@talismn/components';
import { truncateMiddle, useLocalStorage } from '@talismn/ui';
import { BaseWalletError, TalismanWallet } from '@talismn/wallets';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from './index.module.css';
import { ReactComponent as Logo } from '../public/PolkadotLogo.svg';

export function Index() {
  const [modalError, setModalError] = useState<Error>();
  const [buttonError, setButtonError] = useState<Error>();
  const [address, setAddress] = useLocalStorage(
    'talisman-connect/account.address'
  );
  const [name, setName] = useLocalStorage('talisman-connect/account.name');
  const [source, setSource] = useLocalStorage(
    'talisman-connect/account.source'
  );

  const talismanWallet = new TalismanWallet();

  return (
    <div className={styles.page}>
      <div>
        <Link href="/crowdloans">Go to sign dummy message</Link>
      </div>
      <h2>WalletSelect Component</h2>
      <div>
        <WalletSelect
          open
          dappName="My First Dapp"
          // showAccountsList
          triggerComponent={
            <button
              style={{ border: '1px solid black', padding: '1rem 1.5rem' }}
              onClick={(wallets) => {
                console.log(`>>> wallets`, wallets);
                setModalError(null);
              }}
            >
              Connect wallet
            </button>
          }
          header={
            <>
              <div>
                <Logo width="48px" height="48px" />
              </div>
              <div>Connect Wallet</div>
              <div style={{ opacity: 0.5, fontSize: 'small' }}>
                To start using Talisman apps
              </div>
            </>
          }
          footer={
            <div style={{ textAlign: 'center' }}>
              <span style={{ opacity: 0.5 }}>
                By connecting, I accept Talisman{' '}
              </span>
              <Link href="/crowdloans" passHref>
                <a style={{ color: 'inherit' }}>Terms of service</a>
              </Link>
            </div>
          }
          onWalletSelected={(wallet) => {
            console.log(`>>> selected wallet`, wallet);
            setSource(wallet.extensionName);
          }}
          onUpdatedAccounts={(accounts) => {
            console.log(`>>> accounts`, accounts);
          }}
          onError={(err: Error) => {
            setModalError(err);
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
      </div>
      <br />
      <div>Name: {name}</div>
      <div>Address: {truncateMiddle(address)}</div>
      <div>Source: {source}</div>
      {modalError && <div style={{ color: 'red' }}>{modalError.message}</div>}
      {buttonError && <div style={{ color: 'red' }}>{buttonError.message}</div>}

      <h2>WalletSelectButton Component</h2>
      <div>
        <WalletSelectButton
          dappName="My First Dapp (single button)"
          wallet={talismanWallet}
          onClick={(accounts) => {
            setButtonError(undefined);
            console.log(`>>> accounts`, accounts);
            if (!accounts) {
              setButtonError(new Error('Not installed'));
            }
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid black',
              padding: '0.5rem',
              gap: '0.5rem',
            }}
          >
            <span>
              <Image
                width={32}
                height={32}
                src={talismanWallet.logo.src}
                alt={talismanWallet.logo.alt}
              />
            </span>
            {talismanWallet.title}
          </div>
        </WalletSelectButton>
      </div>
      <h2>NFTs</h2>
      <Link href="/crowdloans">Go to NFTs</Link>
    </div>
  );
}

export default Index;
