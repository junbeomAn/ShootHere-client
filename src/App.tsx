/** @jsx jsx */
/* @jsxFrag */
import { css, Global, jsx } from '@emotion/react';
import * as React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import FutsalApp from 'components/FutsalApp/FutsalApp.container';
import AddPlace from 'components/AddPlace/AddPlace.container';
import Calendar from 'components/Calendar/Calendar.container';
import NotFound from 'components/NotFound/NotFound.presenter';
import Footer from 'components/Footer/Footer.presenter';

import { StoreProvider } from 'store';
import AppContainer from './App.container';

export default function App() {
  // const navigate = useNavigate();
  return (
    <StoreProvider>
      <>
        <Routes>
          <Route path='/' element={<AppContainer />}>
            <Route path='/' element={<FutsalApp />} />
            <Route path='addPlace' element={<AddPlace />} />
            <Route path='reservation' element={<Calendar />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </>
    </StoreProvider>
  );
}
