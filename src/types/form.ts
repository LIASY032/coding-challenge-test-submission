import React from 'react';

// zh: 通用的输入元素附加属性类型，覆盖不同表单属性；en: generic extra props for input elements covering various form attributes
export type FormExtraProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'name' | 'placeholder'
> & {
  // zh: value 限定为字符串，符合当前 InputText 实现；en: value constrained to string to match InputText
  value: string;
  // zh: 允许标准输入变更事件处理；en: allow standard input change handler
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};


