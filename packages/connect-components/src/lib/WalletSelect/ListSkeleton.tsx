import { shortenAddress } from '@talismn/connect-ui'
import { WalletAccount } from '@talismn/connect-wallets'

import styles from './WalletSelect.module.css'

export function ListSkeleton() {
  const listItems = Array.from(
    { length: 2 },
    (_v, i): WalletAccount => ({
      name: 'dummy',
      source: `${i}`,
      address: 'dummy',
    }),
  )
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {listItems?.map((account) => {
        return (
          <div
            key={`${account.source}-${account.address}`}
            className={styles['row-button']}
          >
            <span
              style={{
                textAlign: 'left',
                opacity: 0,
              }}
            >
              <div>{account.name}</div>
              <div style={{ fontSize: 'small', opacity: 0.5 }}>
                {shortenAddress(account.address)}
              </div>
            </span>
          </div>
        )
      })}
    </>
  )
}
