import { Global } from '@emotion/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import S, { appStyle, globalStyle } from 'App.styles';
import Logo from '../assets/image/logo_SH.png';
import Footer from 'components/Footer/Footer.presenter';

const AppContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div css={appStyle}>
      <Global styles={globalStyle} />
      <S.LogoBox isHome={isHome} onClick={() => navigate('/')}>
        <S.Logo src={Logo} isHome={isHome} />
      </S.LogoBox>
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppContainer;
