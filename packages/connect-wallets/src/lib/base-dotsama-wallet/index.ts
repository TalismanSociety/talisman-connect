import type { Signer as InjectedSigner } from '@polkadot/api/types'
import {
  InjectedAccount,
  InjectedExtension,
  InjectedWindow,
} from '@polkadot/extension-inject/types'

import { SubscriptionFn, Wallet, WalletAccount } from '../../types'
import { AuthError } from '../errors/AuthError'
import { WalletError } from '../errors/BaseWalletError'
import { NotInstalledError } from '../errors/NotInstalledError'

// TODO: Create a proper BaseWallet class to offload common checks
export class BaseDotsamaWallet implements Wallet {
  extensionName = ''
  title = ''
  installUrl = ''
  logo = {
    src: '',
    alt: '',
  }

  _extension: InjectedExtension | undefined
  _signer: InjectedSigner | undefined

  // API docs: https://polkadot.js.org/docs/extension/
  get extension() {
    return this._extension
  }

  // API docs: https://polkadot.js.org/docs/extension/
  get signer() {
    return this._signer
  }

  get installed() {
    const injectedWindow = window as Window & InjectedWindow
    const injectedExtension = injectedWindow?.injectedWeb3?.[this.extensionName]

    return !!injectedExtension
  }

  get rawExtension() {
    const injectedWindow = window as Window & InjectedWindow
    const injectedExtension = injectedWindow?.injectedWeb3?.[this.extensionName]
    return injectedExtension
  }

  transformError = (err: Error): WalletError | Error => {
    if (err.message.includes('pending authorization request')) {
      return new AuthError(err.message, this)
    }
    return err
  }

  enable = async (dappName: string) => {
    if (!dappName) {
      throw new Error('MissingParamsError: Dapp name is required.')
    }
    if (!this.installed) {
      throw new NotInstalledError(
        `Refresh the browser if ${this.title} is already installed.`,
        this,
      )
    }
    try {
      const injectedExtension = this.rawExtension
      const rawExtension = await injectedExtension?.enable?.(dappName)
      if (!rawExtension) {
        throw new NotInstalledError(
          `${this.title} is installed but is not returned by the 'Wallet.enable(dappname)' function`,
          this,
        )
      }

      const extension: InjectedExtension = {
        ...rawExtension,
        // Manually add `InjectedExtensionInfo` so as to have a consistent response.
        name: this.extensionName,
        version: injectedExtension.version ?? '?',
      }

      this._extension = extension
      this._signer = extension?.signer
    } catch (err) {
      throw this.transformError(err as WalletError)
    }
  }

  getAccounts = async (anyType?: boolean): Promise<WalletAccount[]> => {
    if (!this._extension) {
      throw new NotInstalledError(
        `The 'Wallet.enable(dappname)' function should be called first.`,
        this,
      )
    }
    const accounts = await this._extension.accounts.get(anyType)
    const accountsWithWallet = accounts.map((account) => {
      return {
        ...account,
        source: this._extension?.name as string,
        // Added extra fields here for convenience
        wallet: this,
        signer: this._extension?.signer,
      }
    })

    return accountsWithWallet
  }

  subscribeAccounts = async (callback: SubscriptionFn) => {
    if (!this._extension) {
      throw new NotInstalledError(
        `The 'Wallet.enable(dappname)' function should be called first.`,
        this,
      )
    }
    const unsubscribe = this._extension.accounts.subscribe(
      (accounts: InjectedAccount[]) => {
        const accountsWithWallet = accounts.map((account) => {
          return {
            ...account,
            source: this._extension?.name as string,
            // Added extra fields here for convenience
            wallet: this,
            signer: this._extension?.signer,
          }
        })
        callback(accountsWithWallet)
      },
    )

    return unsubscribe
  }
}
