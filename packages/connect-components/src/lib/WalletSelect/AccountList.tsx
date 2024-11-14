import { shortenAddress } from '@talismn/connect-ui'
import { WalletAccount } from '@talismn/connect-wallets'

import ChevronRightIcon from '../../assets/icons/chevron-right.svg?react'
import { ListWithClickProps } from './types'
import styles from './WalletSelect.module.css'

export function AccountList(props: ListWithClickProps<WalletAccount>) {
  const { items, onClick } = props
  if (!items) {
    return null
  }
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {items?.map((account) => {
        return (
          <button
            key={`${account.source}-${account.address}`}
            className={styles['row-button']}
            onClick={() => onClick?.(account)}
          >
            <span style={{ textAlign: 'left' }}>
              <div>{account.name}</div>
              <div style={{ fontSize: 'small', opacity: 0.5 }}>
                {shortenAddress(account.address)}
              </div>
            </span>
            <ChevronRightIcon />
          </button>
        )
      })}
    </>
  )
}
