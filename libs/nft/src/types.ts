import { ReactElement } from 'react';

export interface NftElement {
  metadataUrl: string;
  LoaderComponent?: ReactElement;
  FallbackComponent?: ReactElement;
  ErrorComponent?: ReactElement;
}
