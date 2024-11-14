export const shortenAddress = (address: string, keepStart = 4, keepEnd = 4) =>
  `${address.substring(0, keepStart)}…${address.substring(address.length - keepEnd)}`

/** @deprecated rename to use `shortenAddress` instead */
export const truncateMiddle = shortenAddress
