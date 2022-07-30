/** @jsx jsx */
import { css, Global, jsx } from '@emotion/react';
import * as React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import FutsalApp from 'components/FutsalApp/FutsalApp.container';
import AddPlace from 'components/AddPlace/AddPlace.container';
import Calendar from 'components/Calendar/Calendar.container';
import NotFound from 'components/NotFound/NotFound.presenter';
import Footer from 'components/Footer/Footer.presenter';

import Logo from '../assets/image/logo_SH.png';

import { appStyle, globalStyle, logoBoxStyle, logoStyle } from 'App.styles';
import { StoreProvider } from 'store';

export default function App() {
  const navigate = useNavigate();
  return (
    <StoreProvider>
      <div css={appStyle}>
        <Global styles={globalStyle} />
        <div css={logoBoxStyle} onClick={() => navigate('/')}>
          <img src={Logo} css={logoStyle} />
        </div>
        <Routes>
          <Route path='/' element={<FutsalApp />} />
          <Route path='/addPlace' element={<AddPlace />} />
          <Route path='/reservation' element={<Calendar />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </StoreProvider>
  );
}
