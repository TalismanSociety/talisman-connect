import styles from './Loading.module.css'

export const Loading = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'inline-flex',
          justifyContent: 'center',
        }}
      >
        <div className={styles['lds-dual-ring']} />
      </div>
      <div style={{ textAlign: 'center', margin: '2rem 2rem 0' }}>
        If this is taking a while, please refresh the browser.
      </div>
    </>
  )
}
