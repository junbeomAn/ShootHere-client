import RootStore from './index';
import { makeAutoObservable } from 'mobx';
import { EModal, TModal } from './store.entity';

class ModalStore {
  _rootStore: RootStore;
  modalType: TModal = EModal.NONE;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this._rootStore = rootStore;
  }

  setModal = (type: TModal) => {
    console.log(type);
    this._rootStore.modalStore.modalType = type;
  };
}

export default ModalStore;
