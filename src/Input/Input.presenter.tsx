/** @jsx jsx */

/* @jsxFrag */
import * as React from 'react';
import { IInput } from './Input.entity';
import { jsx } from '@emotion/react';

import {
  inputStyles,
  inputErrorStyles,
  labelStyles,
  inputPresenterStyles,
} from './Input.styles';

const Input = ({
  error,
  register,
  name,
  id,
  label,
  style,
  ...otherProps
}: IInput) => {
  return (
    <div css={inputPresenterStyles}>
      {label && (
        <label htmlFor={name} css={labelStyles}>
          {label}
        </label>
      )}
      <input
        id={id}
        css={error ? inputErrorStyles : inputStyles(style)}
        {...register?.(name, { required: Number(id) < 2 })} // required는 이름, 주소만
        {...otherProps}
      />
    </div>
  );
};

export default React.memo(Input);
