import { ModalClasses } from '@talisman-connect/ui';
import { Wallet } from '@talisman-connect/wallets';

export interface WalletSelectClasses extends ModalClasses {
  walletRoot?: string;
  walletIcon?: string;
  walletHeader?: string;
}

export interface ListWithClickProps<T> {
  classes?: WalletSelectClasses;
  items?: T[];
  onClick: (item: T) => unknown;
}
export interface WithWalletProps {
  wallet: Wallet;
}
