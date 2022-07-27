/** @jsx jsx */

import { jsx, css } from '@emotion/react';
import { isMobile } from 'react-device-detect';

import PlaceList from 'components/PlaceList/PlaceList.container';
import Map from 'components/Map/Map.container';
import Login from 'components/Login/Login.container';
import Filter from 'components/Filter/Filter.container';
import Modal from 'components/Modal/Modal.container';
import AddPlaceButton from 'components/AddPlaceButton/AddPlaceButton.presenter';

import { IFutsalAppPresenter } from './FutsalApp.entity';
import { futsalAppStyle, appLeftBoxStyle } from './FutsalApp.styles';
import { EModal } from 'store/store.entity';

const FutsalAppPresenter = ({
  onChange,
  data,
  isLoading,
  filter,
  dispatch,
  modalType,
}: IFutsalAppPresenter) => {
  const loginModal = modalType === EModal.LOGIN && (
    <Modal width='300px' height='240px'>
      <Login />
    </Modal>
  );

  return (
    <div css={futsalAppStyle}>
      <section css={appLeftBoxStyle}>
        <Filter onChange={onChange} dispatch={dispatch} filter={filter} />
        {loginModal}

        <PlaceList data={data} isLoading={isLoading} />

        {!isMobile && <AddPlaceButton />}
      </section>
      {!isMobile && <Map />}
    </div>
  );
};

export default FutsalAppPresenter;
