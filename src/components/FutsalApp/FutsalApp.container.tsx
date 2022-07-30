import * as React from 'react';
import { SWRConfig } from 'swr';
import { observer } from 'mobx-react';

import FutsalAppPresenter from './FutsalApp.presenter';

import { client } from 'api/client';
import { getPlaceSearchQuery } from 'api/query';
import { Axios } from 'api/request';
import { usePosition } from 'hooks';
import { debounce, userUtils } from 'utils';

import { IFilterState } from './FutsalApp.entity';
import { IPlace } from 'components/PlaceItem/PlaceItem.entity';
import { ISaveRef } from 'components/Login/Login.entity';
import FutsalAppReducer from './FutsalApp.reducer';
import { useStore } from 'store';
import { toJS } from 'mobx';

const swrGlobalOptions = {
  revalidateOnFocus: false,
  dedupingInterval: 1000000,
};

const { useState, useReducer, useEffect } = React;

const initialState: IFilterState = {
  filter: 'init',
};

const FutsalAppContainer = () => {
  // hook으로 빼는건 ..? usePlaces
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [currentCity, setCurrentCity] = useState('');
  const { lat, lng } = usePosition();
  const [{ filter }, dispatch] = useReducer(FutsalAppReducer, initialState);
  const {
    modalStore: { modalType },
    userStore: { user, setUser },
  } = useStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentQuery = e.target.value || currentCity;
    debounce(getPlaces, currentQuery);
  };

  const getPlaces = (query: string) => {
    if (!query) return;

    setIsLoading(true);
    client
      .fetch(getPlaceSearchQuery(query))
      .then((data) => {
        setData(data);
        dispatch({ type: 'INIT' });
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getCurrentCity = async (lat: number, lng: number) => {
    // useAxios 대체가능
    if (!lat || !lng) return;
    const url = `/api/map/address?lat=${lat}&lng=${lng}`;
    try {
      const { data: address } = await Axios.get<string>(url);
      console.log(address);
      setCurrentCity(address);
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

  useEffect(() => {
    getPlaces(currentCity);
  }, [currentCity]);

  const filteredData = React.useMemo(
    () => getDataByFilter(data, filter),
    [data, filter]
  );

  return (
    <>
      <SWRConfig value={swrGlobalOptions}>
        <FutsalAppPresenter
          onChange={handleSearchChange}
          dispatch={dispatch}
          data={filteredData}
          filter={filter}
          isLoading={isLoading}
          modalType={toJS(modalType)}
        />
      </SWRConfig>
    </>
  );
};

export default observer(FutsalAppContainer);
