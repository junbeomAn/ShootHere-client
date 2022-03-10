import { AxiosRequestConfig } from 'axios';
import { Axios } from '../api/request';

export const getFetcher = async (
  key: string,
  init?: AxiosRequestConfig,
  ...arg: any[]
) => {
  const res = await Axios.get(key, init);
  return res.data;
};
