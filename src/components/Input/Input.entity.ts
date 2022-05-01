import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Interpolation, Theme } from '@emotion/react';
import { ReactEventHandler } from 'react';

export interface IInput {
  id?: string;
  name?: string;
  placeholder?: string;
  error?: boolean;
  label?: string;
  required?: boolean;
  css?: Interpolation<Theme>;
  register?: UseFormRegister<FieldValues>;
  onChange?: ReactEventHandler;
  style?: string;
}
