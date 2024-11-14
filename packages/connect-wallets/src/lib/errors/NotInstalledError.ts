import { BaseWalletError } from './BaseWalletError'

export class NotInstalledError extends BaseWalletError {
  readonly name = 'NotInstalledError'
}
