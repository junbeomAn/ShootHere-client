/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import * as React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import FutsalApp from 'components/FutsalApp/FutsalApp.container';
import AddPlace from 'components/AddPlace/AddPlace.container';
import NotFound from 'components/NotFound/NotFound.presenter';

import { UserContextProvider } from 'context/userContext';
import { PlaceContextProvider } from 'context/placeContext';
import Logo from '../assets/image/logo_SH.png';

import { appStyle, logoBoxStyle, logoStyle } from 'App.styles';
import Footer from 'components/Footer/Footer.presenter';

export default function App() {
  const navigate = useNavigate();
  return (
    <UserContextProvider>
      <div css={appStyle}>
        <div css={logoBoxStyle} onClick={() => navigate('/')}>
          <img src={Logo} css={logoStyle} />
        </div>
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
        <Footer />
      </div>
    </UserContextProvider>
  );
}
