/** @jsx jsx */

import { jsx, css } from '@emotion/react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import PlaceList from 'components/PlaceList/PlaceList.container';
import Map from 'components/Map/Map.container';
import Login from 'components/Login/Login.container';
import Filter from 'components/Filter/Filter.container';
import Modal from 'components/Modal/Modal.container';
import AddPlaceButton from 'components/AddPlaceButton/AddPlaceButton.presenter';

import { ModalContextProvider } from 'context/modalContext';

import { IFutsalAppPresenter } from './FutsalApp.entity';
import { AppLeftBoxStyle, FutsalAppStyle } from './FutsalApp.styles';

const FutsalAppPresenter = ({
  onChange,
  data,
  isLoading,
  filter,
  dispatch,
}: IFutsalAppPresenter) => {
  return (
    <div css={FutsalAppStyle}>
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
        {!isMobile && <AddPlaceButton />}
      </section>
      {!isMobile && <Map />}
    </div>
  );
};

export default FutsalAppPresenter;
