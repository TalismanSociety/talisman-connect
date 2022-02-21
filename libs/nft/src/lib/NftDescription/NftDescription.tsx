import './NftDescription.module.css';

/* eslint-disable-next-line */
export interface NftDescriptionProps {
  nft: any; //TODO
}

export function NftDescription(props: NftDescriptionProps) {
  const { nft } = props;
  const type = nft.metadata_content_type?.split('/')[0];
  return (
    <div
      style={{
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: '#a5a5a5',
            fontSize: 'small',
          }}
        >
          {nft.collection?.name}
        </div>
        <div>{nft.name}</div>
      </div>
      {type !== 'image' && <div>{type}</div>}
    </div>
  );
}

export default NftDescription;
