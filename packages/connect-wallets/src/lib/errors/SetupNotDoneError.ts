import { BaseWalletError } from './BaseWalletError'

export class SetupNotDoneError extends BaseWalletError {
  readonly name = 'SetupNotDoneError'
}
