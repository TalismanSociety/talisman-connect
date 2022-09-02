"use strict";function e(e,t,s,o){return new(s||(s=Promise))((function(c,i){function n(e){try{l(o.next(e))}catch(e){i(e)}}function r(e){try{l(o.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?c(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(n,r)}l((o=o.apply(e,t||[])).next())}))}Object.defineProperty(exports,"__esModule",{value:!0});class t extends Error{constructor(e,s){super(e),this.name="WalletError",Object.setPrototypeOf(this,new.target.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,t),this.wallet=s}}class s extends t{constructor(){super(...arguments),this.name="AuthError"}}class o extends t{constructor(){super(...arguments),this.name="NotInstalledError"}}class c{constructor(){this.extensionName="",this.title="",this.installUrl="",this.logo={src:"",alt:""},this.transformError=e=>e.message.includes("pending authorization request")?new s(e.message,this):e,this.enable=t=>e(this,void 0,void 0,(function*(){if(!t)throw new Error("MissingParamsError: Dapp name is required.");if(!this.installed)throw new o(`Refresh the browser if ${this.title} is already installed.`,this);try{const e=this.rawExtension,s=yield null==e?void 0:e.enable(t);if(!s)throw new o(`${this.title} is installed but is not returned by the 'Wallet.enable(dappname)' function`,this);const c=Object.assign(Object.assign({},s),{name:this.extensionName,version:e.version});this._extension=c,this._signer=null==c?void 0:c.signer}catch(e){throw this.transformError(e)}})),this.getAccounts=t=>e(this,void 0,void 0,(function*(){if(!this._extension)throw new o("The 'Wallet.enable(dappname)' function should be called first.",this);return(yield this._extension.accounts.get(t)).map((e=>{var t,s;return Object.assign(Object.assign({},e),{source:null===(t=this._extension)||void 0===t?void 0:t.name,wallet:this,signer:null===(s=this._extension)||void 0===s?void 0:s.signer})}))})),this.subscribeAccounts=t=>e(this,void 0,void 0,(function*(){if(!this._extension)throw new o("The 'Wallet.enable(dappname)' function should be called first.",this);return this._extension.accounts.subscribe((e=>{const s=e.map((e=>{var t,s;return Object.assign(Object.assign({},e),{source:null===(t=this._extension)||void 0===t?void 0:t.name,wallet:this,signer:null===(s=this._extension)||void 0===s?void 0:s.signer})}));t(s)}))}))}get extension(){return this._extension}get signer(){return this._signer}get installed(){var e;const t=window;return!!(null===(e=null==t?void 0:t.injectedWeb3)||void 0===e?void 0:e[this.extensionName])}get rawExtension(){var e;const t=window;return null===(e=null==t?void 0:t.injectedWeb3)||void 0===e?void 0:e[this.extensionName]}}class i extends c{constructor(){super(...arguments),this.extensionName="talisman",this.title="Talisman",this.installUrl="https://talisman.xyz/download",this.noExtensionMessage="You can use any Polkadot compatible wallet but we recommend using Talisman",this.logo={src:"data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='24' height='24' rx='4' fill='%23D5FF5C'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.5349 12.9159C16.6871 13.2472 17.135 13.3643 17.3929 13.1065L17.8651 12.6345C18.3535 12.1464 19.1453 12.1464 19.6337 12.6345C20.1221 13.1227 20.1221 13.9141 19.6337 14.4023L15.8097 18.2246C14.8921 19.3104 13.5198 20 11.9865 20C10.3851 20 8.95942 19.2478 8.04385 18.0777L4.36629 14.4018C3.87791 13.9136 3.87791 13.1222 4.36629 12.634C4.85467 12.1459 5.64649 12.1459 6.13487 12.634L6.60044 13.0994C6.85253 13.3514 7.29002 13.238 7.43894 12.9141V12.9141C7.46838 12.8501 7.48439 12.7814 7.48439 12.711L7.48438 7.00059C7.48438 6.30991 8.04428 5.75001 8.73496 5.75001C9.42563 5.75001 9.98553 6.30991 9.98553 7.00058L9.98553 9.88892C9.98553 10.1376 10.2403 10.3065 10.4774 10.2315V10.2315C10.6276 10.1841 10.736 10.0474 10.736 9.89001L10.736 5.25041C10.736 4.55974 11.2959 3.99984 11.9866 3.99984C12.6773 3.99984 13.2372 4.55974 13.2372 5.25041L13.2372 9.89018C13.2372 10.0476 13.3456 10.1842 13.4957 10.2316V10.2316C13.7327 10.3065 13.9874 10.1377 13.9874 9.88909L13.9874 7.00059C13.9874 6.30991 14.5473 5.75001 15.2379 5.75001C15.9286 5.75001 16.4885 6.30991 16.4885 7.00058L16.4885 12.7086C16.4885 12.7805 16.5049 12.8506 16.5349 12.9159V12.9159Z' fill='%23FD4848'/%3e%3cpath d='M15.9885 15.5C15.9885 15.5 14.1969 18 11.9867 18C9.77655 18 7.98486 15.5 7.98486 15.5C7.98486 15.5 9.77655 13 11.9867 13C14.1969 13 15.9885 15.5 15.9885 15.5Z' fill='%23D5FF5C'/%3e%3cpath d='M13.8543 15.5C13.8543 16.5311 13.018 17.3671 11.9863 17.3671C10.9545 17.3671 10.1183 16.5311 10.1183 15.5C10.1183 14.4689 10.9545 13.6329 11.9863 13.6329C13.018 13.6329 13.8543 14.4689 13.8543 15.5Z' stroke='%23FD4848' stroke-width='0.265831'/%3e%3cpath d='M13.1041 15.5C13.1041 16.1169 12.6037 16.6171 11.9864 16.6171C11.3691 16.6171 10.8688 16.1169 10.8688 15.5C10.8688 14.8831 11.3691 14.3829 11.9864 14.3829C12.6037 14.3829 13.1041 14.8831 13.1041 15.5Z' stroke='%23FD4848' stroke-width='0.265831'/%3e%3cpath d='M14.605 15.5C14.605 16.9453 13.4327 18.1171 11.9866 18.1171C10.5405 18.1171 9.36827 16.9453 9.36827 15.5C9.36827 14.0547 10.5405 12.8829 11.9866 12.8829C13.4327 12.8829 14.605 14.0547 14.605 15.5Z' stroke='%23FD4848' stroke-width='0.265831'/%3e%3cpath d='M15.3552 15.5C15.3552 17.3595 13.847 18.8671 11.9865 18.8671C10.1259 18.8671 8.61778 17.3595 8.61778 15.5C8.61778 13.6405 10.1259 12.1329 11.9865 12.1329C13.847 12.1329 15.3552 13.6405 15.3552 15.5Z' stroke='%23FD4848' stroke-width='0.265831'/%3e%3cpath d='M12.3534 15.5C12.3534 15.7027 12.1891 15.8671 11.9863 15.8671C11.7836 15.8671 11.6192 15.7027 11.6192 15.5C11.6192 15.2973 11.7836 15.1329 11.9863 15.1329C12.1891 15.1329 12.3534 15.2973 12.3534 15.5Z' fill='%23162BEB' stroke='%23FD4848' stroke-width='0.265831'/%3e%3cellipse cx='11.9863' cy='15.5' rx='0.5' ry='0.5' fill='%23FD4848'/%3e%3cmask id='path-10-inside-1_4684_17034' fill='white'%3e%3cpath d='M15.9885 15.5C15.9885 15.5 14.1969 18 11.9867 18C9.77655 18 7.98486 15.5 7.98486 15.5C7.98486 15.5 9.77655 13 11.9867 13C14.1969 13 15.9885 15.5 15.9885 15.5Z'/%3e%3c/mask%3e%3cpath d='M15.9885 15.5C15.9885 15.5 14.1969 18 11.9867 18C9.77655 18 7.98486 15.5 7.98486 15.5C7.98486 15.5 9.77655 13 11.9867 13C14.1969 13 15.9885 15.5 15.9885 15.5Z' stroke='%23D5FF5C' stroke-width='0.531663' mask='url(%23path-10-inside-1_4684_17034)'/%3e%3c/svg%3e",alt:"Talisman Logo"}}}class n extends c{constructor(){super(...arguments),this.extensionName="polkadot-js",this.title="Polkadot.js",this.noExtensionMessage="You can use any Polkadot compatible wallet but we recommend using Talisman",this.installUrl="https://polkadot.js.org/extension/",this.logo={src:"data:image/svg+xml,%3c%3fxml version='1.0' encoding='utf-8' standalone='yes'%3f%3e%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' x='0px' y='0px' viewBox='15 15 140 140' style='enable-background:new 0 0 170 170%3bzoom: 1%3b' xml:space='preserve'%3e%3cstyle type='text/css'%3e.bg0%7bfill:%23FF8C00%7d .st0%7bfill:white%7d%3c/style%3e%3cg%3e%3ccircle class='bg0' cx='85' cy='85' r='70'%3e%3c/circle%3e%3cg%3e%3cpath class='st0' d='M85%2c34.7c-20.8%2c0-37.8%2c16.9-37.8%2c37.8c0%2c4.2%2c0.7%2c8.3%2c2%2c12.3c0.9%2c2.7%2c3.9%2c4.2%2c6.7%2c3.3c2.7-0.9%2c4.2-3.9%2c3.3-6.7 c-1.1-3.1-1.6-6.4-1.5-9.7C58.1%2c57.6%2c69.5%2c46%2c83.6%2c45.3c15.7-0.8%2c28.7%2c11.7%2c28.7%2c27.2c0%2c14.5-11.4%2c26.4-25.7%2c27.2 c0%2c0-5.3%2c0.3-7.9%2c0.7c-1.3%2c0.2-2.3%2c0.4-3%2c0.5c-0.3%2c0.1-0.6-0.2-0.5-0.5l0.9-4.4L81%2c73.4c0.6-2.8-1.2-5.6-4-6.2 c-2.8-0.6-5.6%2c1.2-6.2%2c4c0%2c0-11.8%2c55-11.9%2c55.6c-0.6%2c2.8%2c1.2%2c5.6%2c4%2c6.2c2.8%2c0.6%2c5.6-1.2%2c6.2-4c0.1-0.6%2c1.7-7.9%2c1.7-7.9 c1.2-5.6%2c5.8-9.7%2c11.2-10.4c1.2-0.2%2c5.9-0.5%2c5.9-0.5c19.5-1.5%2c34.9-17.8%2c34.9-37.7C122.8%2c51.6%2c105.8%2c34.7%2c85%2c34.7z M87.7%2c121.7 c-3.4-0.7-6.8%2c1.4-7.5%2c4.9c-0.7%2c3.4%2c1.4%2c6.8%2c4.9%2c7.5c3.4%2c0.7%2c6.8-1.4%2c7.5-4.9C93.3%2c125.7%2c91.2%2c122.4%2c87.7%2c121.7z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/svg%3e",alt:"Polkadotjs Logo"}}}class r extends c{constructor(){super(...arguments),this.extensionName="subwallet-js",this.title="SubWallet",this.installUrl="https://chrome.google.com/webstore/detail/subwallet/onhogfjeacnfoofkfgppdlbmlmnplgbn?hl=en&authuser=0",this.noExtensionMessage="You can use any Polkadot compatible wallet but we recommend using Talisman",this.logo={src:"data:image/svg+xml,%3csvg width='134' height='134' viewBox='0 0 134 134' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cmask id='mask0_699_5101' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='134' height='134'%3e%3crect width='134' height='134' fill='%23C4C4C4'/%3e%3c/mask%3e%3cg mask='url(%23mask0_699_5101)'%3e%3cpath d='M87.9615 64.3201L87.9456 47.7455L27.1191 16.2236V64.3041L66.0589 85.106L80.2884 78.8367L37.4403 56.1046L37.4722 37.887L87.9615 64.3201Z' fill='url(%23paint0_linear_699_5101)'/%3e%3cpath d='M50.7607 44.8421V50.5052L37.3926 56.2321L37.4883 37.6636L50.7607 44.8421Z' fill='url(%23paint1_linear_699_5101)'/%3e%3cpath d='M50.8095 91.822L80.2895 78.8368L37.4414 56.2163L50.6819 50.5054L105.765 79.2835L50.9212 103.212L50.8095 91.822Z' fill='url(%23paint2_linear_699_5101)'/%3e%3cpath d='M37.4886 87.9773L50.6493 82.2982L50.9365 103.196L105.765 79.2832V97.118L37.377 127.077L37.4886 87.9773Z' fill='url(%23paint3_linear_699_5101)'/%3e%3cpath d='M27.1191 82.5857L37.4403 87.9776L37.3765 127.013L27.1191 121.86V82.5857Z' fill='url(%23paint4_linear_699_5101)'/%3e%3cpath d='M40.1522 76.7791L50.6489 82.2986L37.4403 87.9776L27.1191 82.5857L40.1522 76.7791Z' fill='url(%23paint5_linear_699_5101)'/%3e%3cpath d='M105.765 56.5993L105.702 39.9131L87.9785 47.7457V64.3362L105.765 56.5993Z' fill='url(%23paint6_linear_699_5101)'/%3e%3cpath d='M27.1191 16.2237L45.0337 7.97632L105.732 39.8811L87.9775 47.7456L27.1191 16.2237Z' fill='url(%23paint7_linear_699_5101)'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient id='paint0_linear_699_5101' x1='11.9006' y1='50.6648' x2='119.372' y2='50.6648' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD4B2'/%3e%3cstop offset='0.36' stop-color='%239ACEB7'/%3e%3cstop offset='0.67' stop-color='%2347C8BB'/%3e%3cstop offset='0.89' stop-color='%2314C5BE'/%3e%3cstop offset='1' stop-color='%2300C4BF'/%3e%3c/linearGradient%3e%3clinearGradient id='paint1_linear_699_5101' x1='44.0766' y1='62.8524' x2='44.0766' y2='21.2167' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2300FECF'/%3e%3cstop offset='0.08' stop-color='%2300E5D0'/%3e%3cstop offset='0.24' stop-color='%2300A5D1'/%3e%3cstop offset='0.48' stop-color='%230040D4'/%3e%3cstop offset='0.54' stop-color='%230025D5'/%3e%3cstop offset='1'/%3e%3c/linearGradient%3e%3clinearGradient id='paint2_linear_699_5101' x1='37.4414' y1='76.8587' x2='146.891' y2='76.8587' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FDEC9F'/%3e%3cstop offset='0.08' stop-color='%23E4D8A4'/%3e%3cstop offset='0.24' stop-color='%23A4A6B2'/%3e%3cstop offset='0.47' stop-color='%233F57C8'/%3e%3cstop offset='0.61' stop-color='%230025D5'/%3e%3cstop offset='1'/%3e%3c/linearGradient%3e%3clinearGradient id='paint3_linear_699_5101' x1='15.0596' y1='103.18' x2='155.01' y2='103.18' gradientUnits='userSpaceOnUse'%3e%3cstop offset='0.05' stop-color='%2362A5FF'/%3e%3cstop offset='0.45' stop-color='%231032D1'/%3e%3cstop offset='1'/%3e%3c/linearGradient%3e%3clinearGradient id='paint4_linear_699_5101' x1='628.741' y1='3244.93' x2='797.782' y2='3247.12' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD4B2'/%3e%3cstop offset='0.36' stop-color='%239ACEB7'/%3e%3cstop offset='0.67' stop-color='%2347C8BB'/%3e%3cstop offset='0.89' stop-color='%2314C5BE'/%3e%3cstop offset='1' stop-color='%2300C4BF'/%3e%3c/linearGradient%3e%3clinearGradient id='paint5_linear_699_5101' x1='24.5987' y1='82.3783' x2='72.5834' y2='82.3783' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2300FECF'/%3e%3cstop offset='0.08' stop-color='%2300E5D0'/%3e%3cstop offset='0.25' stop-color='%2300A5D1'/%3e%3cstop offset='0.49' stop-color='%230040D4'/%3e%3cstop offset='0.56' stop-color='%230025D5'/%3e%3c/linearGradient%3e%3clinearGradient id='paint6_linear_699_5101' x1='70.9573' y1='52.5952' x2='189.069' y2='50.4576' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2300FECF'/%3e%3cstop offset='0.05' stop-color='%2300E5D0'/%3e%3cstop offset='0.15' stop-color='%2300A5D1'/%3e%3cstop offset='0.29' stop-color='%230040D4'/%3e%3cstop offset='0.33' stop-color='%230025D5'/%3e%3c/linearGradient%3e%3clinearGradient id='paint7_linear_699_5101' x1='27.1191' y1='27.8689' x2='173.642' y2='27.8689' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFD4AF'/%3e%3cstop offset='0.1' stop-color='%23E6D5BA'/%3e%3cstop offset='0.31' stop-color='%23A7D6D5'/%3e%3cstop offset='0.61' stop-color='%2343D9FF'/%3e%3cstop offset='0.63' stop-color='%2337B1D0'/%3e%3cstop offset='0.65' stop-color='%232B8CA5'/%3e%3cstop offset='0.67' stop-color='%23216B7D'/%3e%3cstop offset='0.7' stop-color='%23184E5B'/%3e%3cstop offset='0.72' stop-color='%2310353F'/%3e%3cstop offset='0.75' stop-color='%230A2228'/%3e%3cstop offset='0.78' stop-color='%23061316'/%3e%3cstop offset='0.82' stop-color='%23020809'/%3e%3cstop offset='0.88' stop-color='%23010202'/%3e%3cstop offset='1'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",alt:"Subwallet Logo"}}}const l=[new i,new r,new n];function a(e){return l.find((t=>t.extensionName===e))}exports.AuthError=s,exports.BaseDotsamaWallet=c,exports.BaseWalletError=t,exports.NotInstalledError=o,exports.PolkadotjsWallet=n,exports.SetupNotDoneError=class extends t{constructor(){super(...arguments),this.name="SetupNotDoneError"}},exports.SubWallet=r,exports.TalismanWallet=i,exports.getWalletBySource=a,exports.getWallets=function(){return l},exports.isWalletInstalled=function(e){const t=a(e);return null==t?void 0:t.installed};