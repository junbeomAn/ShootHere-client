import { IUser } from 'components/Login/Login.entity';

const getUser = (): IUser => {
  const user = localStorage.getItem('user') || null;

  return JSON.parse(user);
};

const setUser = (user: IUser) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export default { getUser, setUser };
