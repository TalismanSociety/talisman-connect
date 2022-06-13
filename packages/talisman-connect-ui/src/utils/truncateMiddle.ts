export const truncateMiddle = (str = '', start = 4, end = 4) =>
  str && str.length
    ? str.length <= start + end
      ? str
      : `${str.substring(0, start)}...` +
        (end > 0 ? str.substring(str.length - end) : '')
    : null;
