/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import * as React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

import CustomButton from '../CustomButton/CustomButton';
import Modal from '../Modal/Modal.container';
import Login from '../Login/Login.container';
import { client } from '../api/client';

import { ModalContext, ModalContextProvider } from '../context/modalContext';

import { IPlaceItem, ISaveButton } from './PlaceItem.entity';
import {
  rightBoxStyle,
  leftBoxStyle,
  PlaceItem,
  getSaveButtonStyles,
} from './PlaceItem.styles';
import { toPrice, stopPropagation } from '../utils';
import { UserContext } from '../context/userContext';
import { nanoid } from 'nanoid';

const SaveButton = ({ isSaved, placeId }: ISaveButton) => {
  const [mouseOver, setMouseOut] = React.useState(false);
  const { setIsOpen } = React.useContext(ModalContext);
  const { user, setUser } = React.useContext(UserContext);

  const SaveStarBtn = isSaved || mouseOver ? AiFillStar : AiOutlineStar;

  const savePlace = (saveIndex: number, placeId: string) => {
    let commitRes;
    if (saveIndex === -1) {
      // not saved
      console.log(`saved ${placeId} place`);
      commitRes = client
        .patch(user._id)
        .insert('after', 'save[-1]', [
          {
            _type: 'save',
            _ref: placeId,
            _key: nanoid(),
          },
        ])
        .commit();
    } else {
      // saved
      console.log(`unsaved ${placeId} place`);
      const savedPlaceToRemove = [
        `save[${saveIndex}]`,
        `save[_ref=="${placeId}"]`,
      ];
      commitRes = client.patch(user._id).unset(savedPlaceToRemove).commit();
    }
    commitRes.then((res) => {
      console.log(res);
      const { _type, _id, userName, save } = res;
      setUser({ _type, _id, userName, save });
    });
  };

  const handleSaveClick = (id: string) => {
    if (!user._id) {
      setIsOpen(true);
      return;
    }
    const saveIndex = user.save.findIndex((item) => item._ref === id);
    savePlace(saveIndex, id);
  };

  return (
    <div
      onMouseOver={() => setMouseOut(true)}
      onMouseLeave={() => setMouseOut(false)}
    >
      <SaveStarBtn
        css={getSaveButtonStyles(isSaved || mouseOver)}
        onClick={stopPropagation(() => {
          handleSaveClick(placeId);
        })}
      />
    </div>
  );
};

const PlaceItemPresenter: React.FunctionComponent<IPlaceItem> = ({
  item,
  handleDirectionsClick,
  handlePlaceClick,
  isSaved,
  isSelected,
}) => {
  const {
    address,
    placeName,
    phoneNumber,
    reservationPage,
    minPrice,
    maxPrice,
    _id,
  } = item;

  return (
    <PlaceItem
      selected={isSelected}
      onClick={() => handlePlaceClick(_id, placeName)}
    >
      <div css={leftBoxStyle}>
        <div className='left-box-item name'>
          {placeName}
          <ModalContextProvider>
            <Modal width='300px' height='240px'>
              <Login />
            </Modal>
            <SaveButton isSaved={isSaved} placeId={_id} />
          </ModalContextProvider>
        </div>
        <div className='left-box-item address'>
          <span>{item.address}</span>
          <CustomButton
            size='medium'
            theme='primary'
            onClick={stopPropagation(() => handleDirectionsClick(address))}
          >
            길찾기
          </CustomButton>
        </div>
      </div>
      <div css={rightBoxStyle}>
        <div className='right-box-item phoneNumber'>
          <i className='fas fa-phone-volume'></i>({phoneNumber || ' - '})
        </div>
        <div className='right-box-item reservationPage'>
          <i className='fab fa-internet-explorer'></i>(
          {reservationPage ? (
            <a target='_blank' href={reservationPage}>
              예약하기
            </a>
          ) : (
            ' - '
          )}
          )
        </div>
        <div className='right-box-item price'>
          <i className='fas fa-won-sign'></i>
          {minPrice && maxPrice
            ? `${toPrice(minPrice)} ~ ${toPrice(maxPrice)}`
            : '-'}
          {}
        </div>
      </div>
    </PlaceItem>
  );
};

export default PlaceItemPresenter;
