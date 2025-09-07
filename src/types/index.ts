import type React from 'react';

export * from './address';
export * from './button';

// zh: 通用输入附加属性类型，供 <Form /> 使用；en: generic input extra props type for <Form />
export type FormExtraProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'name' | 'placeholder'
> & {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
