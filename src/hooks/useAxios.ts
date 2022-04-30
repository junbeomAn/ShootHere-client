import { useState, useRef, useEffect } from 'react';

import { Axios } from '../api/request';
import { IAxiosHook } from './hooks.entity';

const useAxios = <T extends {}>({
  loadOnMount = false,
  url = null,
  method = 'get',
  config,
}: IAxiosHook) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<T>({} as T);
  const controllerRef = useRef(new AbortController());

  const cancelRequest = () => controllerRef.current.abort();
  const getData = async (addUrl?: string) => {
    setIsLoading(true);
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
