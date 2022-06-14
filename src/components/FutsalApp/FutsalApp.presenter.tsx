/** @jsx jsx */

import { jsx, css } from '@emotion/react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import PlaceList from 'components/PlaceList/PlaceList.container';
import Map from 'components/Map/Map.container';
import CustomButton from 'components/CustomButton/CustomButton.presenter';
import Login from 'components/Login/Login.container';
import Filter from 'components/Filter/Filter.container';
import Modal from 'components/Modal/Modal.container';

import { ModalContextProvider } from 'context/modalContext';

import { IFutsalAppPresenter } from './FutsalApp.entity';
import { AppLeftBoxStyle, FutsalAppStyle, NavStyle } from './FutsalApp.styles';

const FutsalAppPresenter = ({
  onChange,
  data,
  isLoading,
  filter,
  dispatch,
}: IFutsalAppPresenter) => {
  return (
    <div css={FutsalAppStyle}>
      {!isMobile && (
        <nav css={NavStyle}>
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
      )}
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
