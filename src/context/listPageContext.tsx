import * as React from 'react';

const listPageContextState: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
} = {
  page: 1,
  setPage: () => {},
};

export const ListPageContext = React.createContext(listPageContextState);

export const ListPageContextProvider: React.FunctionComponent = ({
  children,
}) => {
  const [page, setPage] = React.useState(listPageContextState.page);

  return (
    <ListPageContext.Provider
      value={{
        page,
        setPage,
      }}
    >
      {children}
    </ListPageContext.Provider>
  );
};
