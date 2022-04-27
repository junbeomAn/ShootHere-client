/**@jsx jsx */
/*@jsxFrag */

import { jsx } from '@emotion/react';
import * as React from 'react';
import { IoMdClose } from 'react-icons/io';

import { ModalContext } from '../context/modalContext';
import { modalStyles, closeBtnStyles, ModalBox } from './Modal.styles';
import { IModalContainer } from './Modal.entity';
import { stopPropagation } from '../utils';

const { useEffect, useContext } = React;

const ModalContainer = ({ children, width, height }: IModalContainer) => {
  const { isOpen, setIsOpen } = useContext(ModalContext);

  const onClose = () => {
    setIsOpen(false);
  };

  const onEscapePress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', onEscapePress);

    return () => window.removeEventListener('keyup', onEscapePress);
  }, []);

  return (
    isOpen && (
      <div css={modalStyles} onClick={stopPropagation(onClose)}>
        <ModalBox onClick={stopPropagation()} width={width} height={height}>
          <IoMdClose css={closeBtnStyles} onClick={onClose} />
          {children}
        </ModalBox>
      </div>
    )
  );
};

export default ModalContainer;
