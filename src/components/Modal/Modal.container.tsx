/**@jsx jsx */
/*@jsxFrag */

import { jsx } from '@emotion/react';
import * as React from 'react';
import { IoMdClose } from 'react-icons/io';
import { observer } from 'mobx-react';

import { stopPropagation } from 'utils';

import { modalStyles, closeBtnStyles, ModalBox } from './Modal.styles';
import { IModalContainer } from './Modal.entity';
import { useStore } from 'store';
import { EModal } from 'store/store.entity';

const { useEffect } = React;

const ModalContainer = ({ children, width, height }: IModalContainer) => {
  const {
    modalStore: { setModal },
  } = useStore();
  const handleClose = () => {
    setModal(EModal.NONE);
  };

  const handleEscapePress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleEscapePress);

    return () => window.removeEventListener('keyup', handleEscapePress);
  }, []);

  return (
    <div css={modalStyles} onClick={stopPropagation(handleClose)}>
      <ModalBox onClick={stopPropagation()} width={width} height={height}>
        <IoMdClose css={closeBtnStyles} onClick={handleClose} />
        {children}
      </ModalBox>
    </div>
  );
};

export default observer(ModalContainer);
