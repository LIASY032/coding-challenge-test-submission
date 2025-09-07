import React, { FunctionComponent, ReactNode } from 'react';

import Button from '../Button/Button';
import InputText from '../InputText/InputText';
import $ from './Form.module.css';
import { FormExtraProps } from '@/types';

interface FormEntry {
  name: string;
  placeholder: string;
  extraProps: FormExtraProps;
}

interface FormProps {
  label: string;
  loading?: boolean;
  formEntries: FormEntry[];
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitText: string;
  footer?: ReactNode;
}

const Form: FunctionComponent<FormProps> = ({
  label,
  loading = false,
  formEntries,
  onFormSubmit,
  submitText,
  footer
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <fieldset className={$.fieldset}>
        <legend className={$.legend}>{label}</legend>
        {formEntries.map(({ name, placeholder, extraProps }, index) => (
          <div key={`${name}-${index}`} className={$.formRow}>
            <InputText
              key={`${name}-${index}`}
              name={name}
              placeholder={placeholder}
              {...extraProps}
            />
          </div>
        ))}

        <Button loading={loading} type="submit">
          {submitText}
        </Button>
        {footer}
      </fieldset>
    </form>
  );
};

export default Form;
