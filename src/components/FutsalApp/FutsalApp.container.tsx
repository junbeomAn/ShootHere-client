import * as React from 'react';
import useSWR from 'swr';
import { observer } from 'mobx-react';

import FutsalAppPresenter from './FutsalApp.presenter';

import { client } from 'api/client';
import { getPlaceSearchQuery } from 'api/query';
import { Axios } from 'api/request';
import { usePosition } from 'hooks';
import { userUtils } from 'utils';

import { IFilterState } from './FutsalApp.entity';
import { IPlace } from 'components/PlaceItem/PlaceItem.entity';
import { ISaveRef } from 'components/Login/Login.entity';
import FutsalAppReducer from './FutsalApp.reducer';
import { useStore } from 'store';
import { toJS } from 'mobx';
import { sanityFetcher } from 'hooks/swrFetcher';
import useDebounceValue from 'hooks/useDebounceValue';

const { useState, useReducer, useEffect } = React;

const initialState: IFilterState = {
  filter: 'init',
};

const FutsalAppContainer = () => {
  // hook으로 빼는건 ..? usePlaces
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const { lat, lng } = usePosition();
  const [{ filter }, dispatch] = useReducer(FutsalAppReducer, initialState);
  const {
    modalStore: { modalType },
    userStore: { user, setUser },
    placeStore: { currentCity, setCurrentCity },
  } = useStore();
  const debouncedQuery = useDebounceValue<string>(search || currentCity, 500);
  const {
    data = [],
    error: placeError,
    isValidating,
  } = useSWR<IPlace[]>(
    debouncedQuery ? getPlaceSearchQuery(debouncedQuery) : null,
    sanityFetcher
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentQuery = e.target.value || currentCity;
    setSearch(currentQuery);
  };

  const getCurrentCity = async (lat: number, lng: number) => {
    // useAxios 대체가능
    if (!lat || !lng) return;
    const url = `/api/map/address?lat=${lat}&lng=${lng}`;
    try {
      const { data: city } = await Axios.get<string>(url);
      setCurrentCity(city);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const isSaved = function (item: IPlace) {
    const save: ISaveRef[] = this;
    return save.find((savedItem) => savedItem._ref === item._id);
  };

  const getDataByFilter = (data: IPlace[], filter: string) => {
    if (filter === 'saved') {
      return data.filter(isSaved, user.save);
    } else {
      return data;
    }
  };

  useEffect(() => {
    const localUser = userUtils.getUser();
    if (localUser) {
      client.getDocument(localUser._id).then((user) => {
        const { _type, _id, userName, save } = user;
        const userInfo = { _type, _id, userName, save };
        setUser(userInfo);
        userUtils.setUser(userInfo);
      });
    }
  }, []);

  useEffect(() => {
    getCurrentCity(lat, lng);
  }, [lat, lng]);

  const filteredData = React.useMemo(
    () => getDataByFilter(data, filter),
    [data, filter]
  );
  const isLoading = data.length === 0 || isValidating;

  return (
    <>
      <FutsalAppPresenter
        onChange={handleSearchChange}
        dispatch={dispatch}
        data={filteredData}
        filter={filter}
        isLoading={isLoading}
        modalType={toJS(modalType)}
      />
    </>
  );
};

export default observer(FutsalAppContainer);
