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

const ModalContainer: React.FunctionComponent<IModalContainer> = ({
  children,
  width,
  height,
}) => {
  const { isOpen, setIsOpen } = useContext(ModalContext);

  const onOuterClick = () => {
    setIsOpen(false);
  };

  const onEscapePress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', onEscapePress);

    return () => window.removeEventListener('keyup', onEscapePress);
  }, []);

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
