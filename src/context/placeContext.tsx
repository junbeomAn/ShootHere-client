import * as React from 'react';

type Tdispatch = React.Dispatch<React.SetStateAction<string>>;

export const PlaceContext = React.createContext<string>('');
export const PlaceDispatchContext = React.createContext<Tdispatch>(
  (() => {}) as Tdispatch
);

export const PlaceContextProvider: React.FunctionComponent = ({ children }) => {
  const [place, setPlace] = React.useState('');
  return (
    <PlaceDispatchContext.Provider value={setPlace}>
      <PlaceContext.Provider value={place}>{children}</PlaceContext.Provider>
    </PlaceDispatchContext.Provider>
  );
};
