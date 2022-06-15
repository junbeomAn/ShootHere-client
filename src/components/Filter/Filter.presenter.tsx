/**@jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

import Input from 'components/Input/Input.presenter';

import {
  filterPresenterStyles,
  filterBtnContainerStyles,
  savedFilterActiveStyle,
  savedFilterInActiveStyle,
} from './Filter.styles';
import { IFilterPresenter } from './Filter.entity';

const FilterPresenter = ({ onChange, onClick, filter }: IFilterPresenter) => {
  return (
    <nav css={filterPresenterStyles}>
      <Input
        id='search'
        placeholder='지역, 장소를 검색해보세요.'
        name='search'
        onChange={onChange}
      />
      <ul css={filterBtnContainerStyles}>
        <li
          css={
            filter === 'saved'
              ? savedFilterActiveStyle
              : savedFilterInActiveStyle
          }
          id='saved'
          onClick={onClick}
        >
          {filter === 'saved' ? <AiFillStar /> : <AiOutlineStar />} 즐겨찾기
        </li>
      </ul>
    </nav>
  );
};

export default FilterPresenter;
