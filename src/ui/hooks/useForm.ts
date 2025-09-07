import React from "react";

type FormValues = Record<string, string>;

interface UseFormReturn {
  values: FormValues;
  onFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  reset: () => void;
  setValue: (name: string, value: string) => void;
}

export default function useForm(initialValues: FormValues): UseFormReturn {
  const [values, setValues] = React.useState<FormValues>(initialValues);

  const onFieldChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const setValue = React.useCallback((name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const reset = React.useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return {
    values,
    onFieldChange,
    reset,
    setValue,
  };
}


