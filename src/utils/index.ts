export const toPrice = (price: number) => price.toLocaleString() + '원';

export const createQuery = (
  queryName: string,
  queryValue: string | number
): string => {
  return `${queryName}=${queryValue}`;
};

export const meterToKilometer = (dist: number) => (dist / 1000).toFixed(1);

export { default as debounce } from './debounce';
export { default as userUtils } from './user';
export { default as stopPropagation } from './stopPropagation';
