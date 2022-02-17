import styles from './DualRingLoader.module.css';

/* eslint-disable-next-line */
export interface DualRingLoaderProps {}

export function DualRingLoader(props: DualRingLoaderProps) {
  return <div className={styles['lds-dual-ring']} />;
}

export default DualRingLoader;
