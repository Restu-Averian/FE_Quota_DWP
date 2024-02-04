export const formatQuota = (quota) => {
  return (quota / 4096).toFixed(2) || 0;
};

/**
 * @param {number} num
 */
export const formatNumber = (num) => {
  return num?.toLocaleString("id-ID") || 0;
};

/**
 *
 * @param {string[]} arr
 * @returns
 */
const isArrObj = (arr) => {
  return arr?.every((d) => typeof d === "object");
};

/**
 *
 * @param {string[]} arr
 * @param {string} key
 * @param {'increment'|'decrement'} type
 * @returns
 */
export const sortArr = (arr, key, type) => {
  if (isArrObj(arr)) {
    return arr?.sort((a, b) => {
      if (a[key] > b[key]) {
        return type === "increment" ? -1 : 1;
      } else if (a[key] < b[key]) {
        return type === "increment" ? 1 : -1;
      }
      return 0;
    });
  }
  return [...new Set(arr)];
};
