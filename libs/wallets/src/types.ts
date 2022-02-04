export type SubscriptionFn = (
  accounts: WalletAccount[]
) => void | Promise<void>;

export interface WalletLogoProps {
  // Logo url
  src: string;
  // Alt for the Logo url
  alt: string;
}

export interface WalletAccount {
  address: string;
  name?: string;
  source: string;
  wallet: Wallet;
  signer?: unknown;
}

export interface WalletData {
  // The name of the wallet extension. Should match `Account.source`
  extensionName: string;
  // Display name for the wallet extension
  title: string;
  // The wallet logo
  logo: WalletLogoProps;
}

export interface WalletExtension {
  // The raw extension object which will have everything a dapp developer needs.
  // Refer to a specific wallet's extension documentation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extension: any;

  // The raw signer object for convenience. Usually the implementer can derive this from the extension object.
  // Refer to a specific wallet's extension documentation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signer: any;
}

export interface Signer {
  // Sign function
  sign?: (address: string, payload: string) => unknown;
}

export interface Connector {
  // The subscribe to accounts function
  subscribeAccounts: (callback: SubscriptionFn) => unknown;
}

export interface Wallet
  extends WalletData,
    WalletExtension,
    Connector,
    Signer {}
