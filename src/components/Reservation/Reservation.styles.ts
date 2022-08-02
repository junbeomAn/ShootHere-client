import { css } from '@emotion/react';
import styled from '@emotion/styled';

import CustomButtonPresenter from 'components/CustomButton/CustomButton.presenter';
import { futsalAppStyle } from 'components/FutsalApp/FutsalApp.styles';
import Input from 'components/Input/Input.presenter';
import { IBooker } from './Reservation.entity';

const Reservation = styled.section`
  /* width: 100%;
  display: flex;
  justify-content: center; */
  ${futsalAppStyle}
  justify-content: space-between;
  width: 70%;
  height: 100%;
  padding: 30px;
  margin: 20px auto;
`;
const ReserveInfo = styled.div`
  margin-left: 50px;
  min-width: 300px;
  height: 500px;
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 2px 5px #31313154;
  position: relative;
  top: 120px;
`;
const Title = styled.h2``;
const PlaceName = styled.p``;
const Address = styled.p``;
const Date = styled.p``;

const customInputStyle = css`
  border-bottom: 2px solid #d0d0d0;
  margin: 15px 0;
  padding: 10px;
`;

const Form = styled.form``;

const ExtraOrdersInput = styled(Input)`
  ${customInputStyle}
`;

const BookerInput = styled(Input)<IBooker>`
  ${customInputStyle}
`;
const Booker = styled.p``;
const ExtraOrders = styled.p``;

const CustomButton = styled(CustomButtonPresenter)`
  position: absolute;
  bottom: 15px;
  right: 15px;
`;

const PaymentButton = styled(CustomButtonPresenter)``;

export default {
  Reservation,
  ReserveInfo,
  Title,
  PlaceName,
  Address,
  Date,
  Form,
  ExtraOrdersInput,
  BookerInput,
  ExtraOrders,
  Booker,
  CustomButton,
  PaymentButton,
};
