/** @jsx jsx */
/* @jsxFrag */
import { jsx } from '@emotion/react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { observer } from 'mobx-react';

import { client } from 'api/client';
import userUtils from 'utils/user';

import { IUser } from './Login.entity';

import { loginBtnStyles, loginModalTitleStyles } from './Login.styles';
import { useStore } from 'store';
import { EModal } from 'store/store.entity';

const Login = () => {
  const navigate = useNavigate();
  const {
    modalStore: { setModal },
    userStore: { setUser },
  } = useStore();

  const responseGoogleOnSuccess = (response: GoogleLoginResponse) => {
    if (response.googleId) {
      const { googleId, name } = response.profileObj;

      const doc: IUser = {
        _type: 'user',
        _id: googleId,
        userName: name,
        save: [],
      };

      client.createIfNotExists(doc).then((res) => {
        userUtils.setUser(res);
        setUser(res);
        setModal(EModal.NONE);
      });
    }
  };

  const responseGoogleOnFailure = (response: GoogleLoginResponse) => {
    console.log(response);
    // navigate('/login');
  };

  React.useEffect(() => {
    const isLogin = userUtils.getUser();

    if (isLogin) navigate('/');
  }, []);

  return (
    <>
      <h3 css={loginModalTitleStyles}>로그인이 필요한 서비스입니다.</h3>
      <GoogleLogin
        clientId={process.env.GOOGLE_LOGIN_CLIENT_ID}
        onSuccess={responseGoogleOnSuccess}
        onFailure={responseGoogleOnFailure}
        render={(renderProps) => (
          <button
            css={loginBtnStyles}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <FcGoogle />
            구글 아이디로 로그인
          </button>
        )}
        cookiePolicy='single_host_origin'
      />
    </>
  );
};

export default observer(Login);
