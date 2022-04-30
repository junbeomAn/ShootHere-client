export const toPrice = (price: number) => price.toLocaleString() + '원';

export const createQuery = (
  queryName: string,
  queryValue: string | number
): string => {
  return `${queryName}=${queryValue}`;
};

export function createQueryString<
  T extends { [key: string]: string | number | undefined }
>(params: T): string {
  const qs = '?';

  if (Object.keys(params).length === 0) return '';

  return Object.keys(params).reduce((acc: string, key: string, i: number) => {
    if (!params[key]) return acc;

    return acc + `${i !== 0 ? '&' : ''}${key}=${params[key]}`;
  }, qs);
}

export const meterToKilometer = (dist: number) => (dist / 1000).toFixed(1);

export { default as debounce } from './debounce';
export { default as userUtils } from './user';
export { default as stopPropagation } from './stopPropagation';
