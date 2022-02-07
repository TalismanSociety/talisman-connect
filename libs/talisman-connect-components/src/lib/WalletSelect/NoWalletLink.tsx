// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function NoWalletLink(props: any) {
  return (
    <button
      style={{
        textAlign: 'center',
        textDecoration: 'underline',
        width: '100%',
        fontSize: 'small',
        opacity: 0.5,
      }}
      onClick={props.onClick}
    >
      I don't have a wallet
    </button>
  );
}
