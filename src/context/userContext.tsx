import * as React from 'react';
import { IUser } from '../Login/Login.entity';

export interface IUserContextState {
  user: IUser;
  setUser: (user: IUser) => void;
}

const userContextDefaultValue = {
  user: {} as IUser,
  setUser: () => {},
};

export const UserContext = React.createContext<IUserContextState>(
  userContextDefaultValue
);

export const UserContextProvider: React.FunctionComponent = ({ children }) => {
  const [user, setUser] = React.useState<IUser>(userContextDefaultValue.user);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
