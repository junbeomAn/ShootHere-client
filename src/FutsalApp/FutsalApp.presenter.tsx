/** @jsx jsx */

import { jsx, css } from '@emotion/react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import PlaceList from '../PlaceList/PlaceList.container';
import Map from '../Map/Map.container';
import CustomButton from '../CustomButton/CustomButton';
import Login from '../Login/Login.container';
import Filter from '../Filter/Filter.container';
import Modal from '../Modal/Modal.container';

import { IFutsalAppPresenter } from './FutsalApp.entity';
import { AppLeftBoxStyle, FutsalAppStyle } from './FutsalApp.styles';
import { ModalContextProvider } from '../context/modalContext';

const FutsalAppPresenter = ({
  onChange,
  data,
  isLoading,
  filter,
  dispatch,
}: IFutsalAppPresenter) => {
  return (
    <div css={FutsalAppStyle}>
      <nav
        css={css`
          position: absolute;
          top: -80px;
          right: 10px;
          display: flex;
          align-items: center;
        `}
      >
        <Link to='/addPlace'>
          <CustomButton
            css={css`
              font-size: 25px;
            `}
            size='medium'
            theme='primary'
          >
            +
          </CustomButton>
        </Link>
      </nav>

      <section css={AppLeftBoxStyle}>
        <ModalContextProvider>
          <Filter onChange={onChange} dispatch={dispatch} filter={filter} />
          <Modal width='300px' height='240px'>
            <Login />
          </Modal>
        </ModalContextProvider>
        <ModalContextProvider>
          <PlaceList data={data} isLoading={isLoading} />
        </ModalContextProvider>
      </section>
      {!isMobile && <Map />}
    </div>
  );
};

export default FutsalAppPresenter;
