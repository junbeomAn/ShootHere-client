/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PlaceContextProvider } from './context/placeContext';
import FutsalApp from './FutsalApp/FutsalApp.container';
import AddPlace from './AddPlace/AddPlace.container';
import { Axios } from './api/request';
import NotFound from './NotFound/NotFound.presenter';
import Login from './Login/Login.container';
import { UserContextProvider } from './context/userContext';
import mq from './commonStyles/mediaQuery';

const AppStyle = css`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function App() {
  return (
    <UserContextProvider>
      <div css={AppStyle}>
        <h1
          css={css`
            position: absolute;
            top: 30px;
            ${mq.mobile} {
              top: 0px;
            }
          `}
        >
          SHOOT HERE
        </h1>
        <Routes>
          <Route
            path='/'
            element={
              <PlaceContextProvider>
                <FutsalApp />
              </PlaceContextProvider>
            }
          />
          <Route path='/addPlace' element={<AddPlace />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </UserContextProvider>
  );
}
