import { Dispatch } from 'react';
import { IDataAction } from 'components/FutsalApp/FutsalApp.entity';

export interface IFilterContainer {
  onChange: (e: React.ChangeEvent) => void;
  dispatch: Dispatch<IDataAction>;
  filter: string;
}

export interface IFilterPresenter {
  onChange: (e: React.ChangeEvent) => void;
  onClick: (e: React.MouseEvent) => void;
  filter: string;
}
