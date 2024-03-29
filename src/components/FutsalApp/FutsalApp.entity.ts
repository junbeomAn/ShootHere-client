import * as React from 'react';
import { IPlace } from 'components/PlaceItem/PlaceItem.entity';
import { IBase } from 'commonEntity';
import { TModal } from 'store/store.entity';

export interface IFutsalAppPresenter extends IBase {
  onChange: React.ChangeEventHandler;
  dispatch: React.Dispatch<IDataAction>;
  data: IPlace[];
  filter: string;
  modalType: TModal;
}

export interface IFilterState {
  filter: string;
}

export interface IDataAction {
  type: string;
}
