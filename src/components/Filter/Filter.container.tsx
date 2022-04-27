import * as React from 'react';

import { dataActions } from 'components/FutsalApp/FutsalApp.actions';
import FilterPresenter from './Filter.presenter';

import { UserContext } from 'context/userContext';
import { ModalContext } from 'context/modalContext';
import { IFilterContainer } from './Filter.entity';

const { useContext } = React;

const FilterContainer = ({ onChange, dispatch, filter }: IFilterContainer) => {
  const { user } = useContext(UserContext);
  const { setIsOpen } = useContext(ModalContext);

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

  const onFilterClick = (e: React.MouseEvent) => {
    if (!user._id) {
      setIsOpen(true);
      return;
    }
    const { id } = e.currentTarget;
    changeFilter(id !== filter ? id : 'init');
  };
  return (
    <FilterPresenter
      onChange={onChange}
      onClick={onFilterClick}
      filter={filter}
    />
  );
};

export default FilterContainer;
