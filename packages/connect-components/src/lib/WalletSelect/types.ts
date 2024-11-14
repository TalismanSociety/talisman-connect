import { Wallet } from '@talismn/connect-wallets'

export interface ListWithClickProps<T> {
  items?: T[]
  makeInstallable?: boolean
  onClick: (item: T) => unknown
}

export interface WithWalletProps {
  wallet: Wallet
}
