interface IUseFormOutput<T> {
  form: T;
  onChange: (event: any) => void;
  onBlur: (event: any) => void;
  handleSubmit: (event: any) => void;
}
