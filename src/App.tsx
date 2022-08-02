/** @jsx jsx */
/* @jsxFrag */
import { css, Global, jsx } from '@emotion/react';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SWRConfig, SWRConfiguration } from 'swr';

import FutsalApp from 'components/FutsalApp/FutsalApp.container';
import AddPlace from 'components/AddPlace/AddPlace.container';
import NotFound from 'components/NotFound/NotFound.presenter';
import Reservation from 'components/Reservation/Reservation.container';
import AppContainer from './App.container';

import { StoreProvider } from 'store';

export default function App() {
  const swrGlobalOptions: SWRConfiguration = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 1000000,
  };
  return (
    <StoreProvider>
      <SWRConfig value={swrGlobalOptions}>
        <>
          <Routes>
            <Route path='/' element={<AppContainer />}>
              <Route path='/' element={<FutsalApp />} />
              <Route path='addPlace' element={<AddPlace />} />
              <Route path='reservation' element={<Reservation />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </>
      </SWRConfig>
    </StoreProvider>
  );
}
