/**@jsx jsx */
/*@jsxFrag */

import { jsx } from '@emotion/react';
import * as React from 'react';
import { IoMdClose } from 'react-icons/io';

import { ModalContext } from '../context/modalContext';
import { modalStyles, closeBtnStyles, ModalBox } from './Modal.styles';
import { IModalContainer } from './Modal.entity';
import { stopPropagation } from '../utils';

const ModalContainer: React.FunctionComponent<IModalContainer> = ({
  children,
  width,
  height,
}) => {
  const { isOpen, setIsOpen } = React.useContext(ModalContext);

  const onOuterClick = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div css={modalStyles} onClick={stopPropagation(onOuterClick)}>
        <ModalBox onClick={stopPropagation()} width={width} height={height}>
          <IoMdClose css={closeBtnStyles} onClick={() => setIsOpen(false)} />
          {children}
        </ModalBox>
      </div>
    )
  );
};

export default ModalContainer;
