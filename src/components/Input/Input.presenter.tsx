/** @jsx jsx */

/* @jsxFrag */
import * as React from 'react';
import { jsx } from '@emotion/react';

import { IInput } from './Input.entity';
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
  required,
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
        css={error ? inputErrorStyles(style) : inputStyles(style)}
        {...register?.(name, { required })}
        name={name}
        {...otherProps}
      />
    </div>
  );
};

export default Input;
