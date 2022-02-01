interface WalletLogoProps {
  // Logo url
  src: string;
  // Alt for the Logo url
  alt: string;
}

export interface WalletData {
  // The name of the wallet extension
  extensionName: string;
  // Display name for the wallet extension
  title: string;
  // The wallet logo
  logo: WalletLogoProps;
}

export type SubscriptionFn<T> = (accounts: T[]) => void | Promise<void>;

export interface Connector {
  // The subscribe function
  subscribe: <T>(callback: SubscriptionFn<T>) => unknown;
}

export interface Wallet extends WalletData, Connector {}
