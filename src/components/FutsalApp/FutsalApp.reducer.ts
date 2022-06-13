import { IFilterState, IDataAction } from './FutsalApp.entity';
import { dataActions } from 'components/FutsalApp/FutsalApp.actions';

const FutsalAppReducer = (
  state: IFilterState,
  action: IDataAction
): IFilterState => {
  switch (action.type) {
    case dataActions.SAVED:
      return {
        ...state,
        filter: 'saved',
      };
    case dataActions.INIT:
      return {
        ...state,
        filter: 'init',
      };
    default:
      return state;
  }
};

export default FutsalAppReducer;
