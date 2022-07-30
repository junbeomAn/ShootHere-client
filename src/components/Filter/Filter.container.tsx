import * as React from 'react';
import { observer } from 'mobx-react';

import { dataActions } from 'components/FutsalApp/FutsalApp.actions';
import FilterPresenter from './Filter.presenter';

import { IFilterContainer } from './Filter.entity';
import { useStore } from '../../store';
import { EModal } from 'store/store.entity';

const FilterContainer = ({ onChange, dispatch, filter }: IFilterContainer) => {
  const {
    modalStore: { setModal },
    userStore: { user },
  } = useStore();

  const changeFilter = (newFilter: string) => {
    switch (newFilter) {
      case 'init':
        dispatch({ type: dataActions.INIT });
        break;
      case 'saved':
        dispatch({ type: dataActions.SAVED });
        break;
      default:
        throw new Error('Unavailable filter is selected.');
    }
  };

  const handleFilterClick = (e: React.MouseEvent) => {
    if (!user._id) {
      setModal(EModal.LOGIN);
      return;
    }
    const { id } = e.currentTarget;
    changeFilter(id !== filter ? id : 'init');
  };
  return (
    <FilterPresenter
      onChange={onChange}
      onClick={handleFilterClick}
      filter={filter}
    />
  );
};

export default observer(FilterContainer);
