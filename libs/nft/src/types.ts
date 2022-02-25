import { ReactElement } from 'react';

declare module '@google/model-viewer/lib/model-viewer.js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'model-viewer': any;
    }
  }
}

// interface ModelViewerJSX {
//   src: string | null;
// }

export interface NftData {
  nft: any; // TODO: Get proper type for this.
}

export interface NftElement extends NftData {
  LoaderComponent?: ReactElement;
  FallbackComponent?: ReactElement;
  ErrorComponent?: ReactElement;
}
