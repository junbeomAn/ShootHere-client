import { AxiosRequestConfig } from 'axios';

import { Axios } from 'api/request';
import { client } from 'api/client';

export const getFetcher = async (
  key: string,
  init?: AxiosRequestConfig,
  ...arg: any[]
) => {
  const res = await Axios.get(key, init);
  return res.data;
};

export async function sanityFetcher(query: string) {
  const data = await client.fetch(query);
  return data;
}
