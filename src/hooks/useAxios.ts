import { useState, useRef, useEffect } from 'react';

import { Axios } from '../api/request';
import { IAxiosHook } from './hooks.entity';

const useAxios = <T extends {}>({
  config,
  loadOnMount = false,
  defaultValue,
}: IAxiosHook<T>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<T>(defaultValue);
  const controllerRef = useRef(new AbortController());

  const cancelRequest = () => controllerRef.current.abort();
  const getData = async (addUrl?: string) => {
    setIsLoading(true);
    const { url = null, method = 'get' } = config;
    const newUrl = `${url ?? ''}${addUrl}`;

    try {
      const response = await Axios.request<T>({
        ...config,
        method,
        url: newUrl,
        signal: controllerRef.current.signal,
      });
      setData(response.data);
    } catch (err) {
      setError('Failed to load data. Please try it again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loadOnMount) {
      getData();
    }
  }, []);

  return { getData, error, isLoading, data, cancelRequest };
};

export default useAxios;
