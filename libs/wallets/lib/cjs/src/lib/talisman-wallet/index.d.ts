import { BaseDotsamaWallet } from '../base-dotsama-wallet';
export declare class TalismanWallet extends BaseDotsamaWallet {
    extensionName: string;
    title: string;
    installUrl: string;
    noExtensionMessage: string;
    logo: {
        src: string;
        alt: string;
    };
}
