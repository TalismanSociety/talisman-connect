import { HTMLAttributes } from 'react'

import styles from './DualRingLoader.module.css'

export const DualRingLoader = ({
  className = '',
  style,
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={`${styles['lds-dual-ring']} ${className}`} style={style} />
)
