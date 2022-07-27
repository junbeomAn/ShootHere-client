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
  const onClose = () => {
    setModal(EModal.NONE);
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
    <div css={modalStyles} onClick={stopPropagation(onClose)}>
      <ModalBox onClick={stopPropagation()} width={width} height={height}>
        <IoMdClose css={closeBtnStyles} onClick={onClose} />
        {children}
      </ModalBox>
    </div>
  );
};

export default observer(ModalContainer);
