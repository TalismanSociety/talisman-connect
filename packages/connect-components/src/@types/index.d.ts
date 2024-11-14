declare module 'react-transition-group'
declare module '*.module.css'
declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
// declare module '@talismn/connect-wallets' {
//   export * from '@talismn/connect-wallets/dist';
// }
// declare module '@talismn/connect-ui' {
//   export * from '@talismn/connect-ui/dist';
// }
