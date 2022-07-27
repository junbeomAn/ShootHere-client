import RootStore from 'store';
import { makeAutoObservable, makeObservable, computed, action } from 'mobx';
import { IUser } from 'components/Login/Login.entity';

class UserStore {
  _rootStore: RootStore;
  user: IUser = {} as IUser;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this._rootStore = rootStore;
  }

  setUser = (user: IUser) => {
    this._rootStore.userStore.user = user;
  };
}

export default UserStore;
