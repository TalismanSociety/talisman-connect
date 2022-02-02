interface WalletLogoProps {
  // Logo url
  src: string;
  // Alt for the Logo url
  alt: string;
}

interface WalletData {
  // The name of the wallet extension
  extensionName: string;
  // Display name for the wallet extension
  title: string;
  // The wallet logo
  logo: WalletLogoProps;
}

interface Account {
  wallet?: Wallet;
  address: string;
  name?: string;
}

type SubscriptionFn = (accounts: Account[]) => void | Promise<void>;

interface Connector {
  // The subscribe to accounts function
  subscribeAccounts: (callback: SubscriptionFn) => unknown;

  // Sign function
  sign?: (address: string, payload: string) => unknown;
}

interface Wallet extends WalletData, Connector {}
