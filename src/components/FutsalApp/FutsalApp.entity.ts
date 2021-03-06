import * as React from 'react';
import { IPlace } from 'components/PlaceItem/PlaceItem.entity';
import { IBase } from 'commonEntity';

type TPlaceArray = IPlace[];

export interface IFutsalAppPresenter extends IBase {
  onChange: React.ChangeEventHandler;
  dispatch: React.Dispatch<IDataAction>;
  data: TPlaceArray;
  filter: string;
}

export interface IFilterState {
  filter: string;
}

export interface IDataAction {
  type: string;
}
