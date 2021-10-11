import { useCallback, useState } from "react";

export const onValidate = (field: any) => {
  if (field.required && !field.value) return "This field is required.";
  else return undefined;
};

export const useForm = <T = any>(initialState?: T): IUseFormOutput<T> => {
  const [form, setForm] = useState<T>(initialState);

  const onError = useCallback(
    (field: any, error: string) =>
      setForm((prev: any) => ({
        ...prev,
        [field.name]:
          prev && prev[field.name]
            ? {
                ...prev[field.name],
                error,
              }
            : {
                value: "",
                error,
              },
      })),
    []
  );

  return {
    form,
    onChange: useCallback((event: any) => {
      setForm((prev) => ({
        ...prev,
        [event.target.name]: { error: null, value: event.target.value },
      }));
    }, []),
    onBlur: useCallback((event: any) => {
      const error = onValidate(event.target);
      if (error) onError(event.target, error);
    }, []),
    handleSubmit: (callback: any) => (e: any) => {
      e.preventDefault();
      if (
        !Object.values(form || {}).some(
          (it: { value: string; error: any }) => it.error
        )
      ) {
        const fields = Object.values(e.target.elements).filter(
          (item: { name: string }) => item.name
        );
        fields.forEach((field: any, index) => {
          const error = onValidate(field);
          if (error) onError(field, error);
          else if (index === fields.length - 1) {
            if (
              !Object.values(form || {}).some(
                (it: { value: string; error: any }) => it.error
              )
            )
              callback(form);
          }
        });
      }
    },
  };
};
