/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import * as React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import FutsalApp from './FutsalApp/FutsalApp.container';
import AddPlace from './AddPlace/AddPlace.container';
import NotFound from './NotFound/NotFound.presenter';
import Logo from '../assets/image/logo_SH.png';

import mq from './commonStyles/mediaQuery';
import { UserContextProvider } from './context/userContext';
import { PlaceContextProvider } from './context/placeContext';

const AppStyle = css`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LogoBoxStyle = css`
  cursor: pointer;
  position: absolute;
  top: 30px;
  display: flex;
  align-items: center;
  ${mq.mobile} {
    top: 0px;
  }
`;

const LogoStyle = css`
  width: 300px;
  ${mq.mobile} {
    width: 200px;
  }
`;

export default function App() {
  const navigate = useNavigate();
  return (
    <UserContextProvider>
      <div css={AppStyle}>
        <div css={LogoBoxStyle} onClick={() => navigate('/')}>
          <img src={Logo} css={LogoStyle} />
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
      </div>
    </UserContextProvider>
  );
}
