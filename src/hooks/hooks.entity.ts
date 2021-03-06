import { Method, AxiosRequestConfig } from 'axios';

export interface IPathCoords {
  startLat: number;
  startLng: number;
  goalLat: number;
  goalLng: number;
}

export type ICoordsArray = number[][];

export interface IUsePathResponse {
  data: ICoordsArray;
  isLoading: boolean;
  isError: unknown;
}

export interface ICoords {
  lat: number;
  lng: number;
}

export interface IAxiosHook<T> {
  config?: AxiosRequestConfig;
  loadOnMount?: boolean;
  defaultValue?: T;
}
