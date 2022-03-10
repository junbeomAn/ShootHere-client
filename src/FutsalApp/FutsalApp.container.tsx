import * as React from 'react';
import { Link } from 'react-router-dom';
import { SWRConfig } from 'swr';

import FutsalAppPresenter from './FutsalApp.presenter';

import { client } from '../api/client';
import { getPlaceSearchQuery } from '../api/query';
import { debounce, userUtils } from '../utils/';
import { UserContext } from '../context/userContext';
import { IFilterState, IDataAction } from './FutsalApp.entity';
import { dataActions } from './FutsalApp.actions';
import { IPlace } from '../PlaceItem/PlaceItem.entity';
import { ModalContextProvider } from '../context/modalContext';

const swrGlobalOptions = {
  revalidateOnFocus: false,
  dedupingInterval: 1000000,
};

const { useState, useContext, useReducer } = React;

const initialState: IFilterState = {
  filter: 'init',
};

const reducer = (state: IFilterState, action: IDataAction): IFilterState => {
  switch (action.type) {
    case dataActions.SAVED:
      return {
        ...state,
        filter: 'saved',
      };
    case dataActions.INIT:
      return {
        ...state,
        filter: 'init',
      };
    default:
      return state;
  }
};

const FutsalAppContainer = () => {
  // hook으로 빼는건 ..? usePlaces
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [{ filter }, dispatch] = useReducer(reducer, initialState);

  const { user, setUser } = useContext(UserContext);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(getPlaces, e.target.value);
  };

  const getPlaces = (query: string = '') => {
    setIsLoading(true);
    client
      .fetch(getPlaceSearchQuery(query))
      .then((data) => {
        dispatch({ type: 'INIT' });
        setData(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getDataByFilter = (data: IPlace[], filter: string) => {
    if (filter === 'saved') {
      const save = user.save;
      return data.filter((item) =>
        save.find((savedItem) => savedItem._ref === item._id)
      );
    } else {
      return data;
    }
  };

  React.useEffect(() => {
    const localUser = userUtils.getUser();
    if (localUser) {
      client.getDocument(localUser._id).then((user) => {
        const { _type, _id, userName, save } = user;
        const userInfo = { _type, _id, userName, save };
        setUser(userInfo);
        userUtils.setUser(userInfo);
      });
    }
    // query를 넘겨주어 현재 도시의 데이터를 불러와야한다.
    getPlaces();
  }, []);

  const filteredData = React.useMemo(
    () => getDataByFilter(data, filter),
    [data, filter]
  );

  return (
    <>
      <SWRConfig value={swrGlobalOptions}>
        <FutsalAppPresenter
          onChange={onSearchChange}
          dispatch={dispatch}
          data={filteredData}
          filter={filter}
          isLoading={isLoading}
        />
      </SWRConfig>
    </>
  );
};

export default FutsalAppContainer;
