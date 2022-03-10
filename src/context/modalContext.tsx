import * as React from 'react';

export interface IModalContextState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ModalContextDefaultValue: IModalContextState = {
  isOpen: false,
  setIsOpen: () => {},
};

export const ModalContext = React.createContext<IModalContextState>(
  ModalContextDefaultValue
);

export const ModalContextProvider: React.FunctionComponent = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(
    ModalContextDefaultValue.isOpen
  );

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
