import { renderHook, act } from "@testing-library/react-hooks";
import { useForm } from "..";

type TForm = {
  userName: { value: string; error: any };
  password: { value: string; error: any };
};

const formMockDefaultValue: TForm = {
  userName: { value: "test1", error: null },
  password: { value: "test2", error: null },
};

describe("Use form hook", () => {
  it("Should render properly", () => {
    const { result } = renderHook(() => useForm<TForm>(formMockDefaultValue));
    expect(result.current.form).toStrictEqual(formMockDefaultValue);
  });

  it("Should change properly", () => {
    const { result } = renderHook(() => useForm<TForm>(formMockDefaultValue));
    act(() =>
      result.current.onChange({
        target: { name: "userName", value: "user@example.com" },
      })
    );
    expect(result.current.form.userName).toStrictEqual({
      error: null,
      value: "user@example.com",
    });
  });

  it("Should blur properly", () => {
    const { result } = renderHook(() => useForm<TForm>(formMockDefaultValue));
    act(() =>
      result.current.onBlur({
        target: { name: "userName", value: "", required: true },
      })
    );
    expect(result.current.form.userName?.error).toBe("This field is required.");
  });

  it("Should submit properly", () => {
    const { result } = renderHook(() => useForm());
    let submitState;
    act(() =>
      result.current.onChange({
        target: {
          name: "userName",
          value: "user@example.com",
        },
      })
    );
    act(() =>
      result.current.onChange({
        target: { name: "password", value: "12345" },
      })
    );
    act(() =>
      result.current.handleSubmit((state: any) => (submitState = state))({
        target: {
          elements: {
            0: { name: "userName", value: "user@example.com" },
            1: { name: "password", value: "12345" },
          },
        },
        preventDefault: jest.fn(),
      })
    );
    expect(submitState).toStrictEqual({
      password: { error: null, value: "12345" },
      userName: { error: null, value: "user@example.com" },
    });
  });

  it("Should generate error on submit when input is empty ", () => {
    const { result } = renderHook(() => useForm());
    let submitState;
    act(() =>
      result.current.handleSubmit((state: any) => (submitState = state))({
        target: {
          elements: {
            0: { name: "userName", value: "", required: true },
            1: { name: "password", value: "", required: true },
          },
        },
        preventDefault: jest.fn(),
      })
    );

    expect(submitState).toStrictEqual(undefined);
    expect(result.current.form).toStrictEqual({
      password: { error: "This field is required.", value: "" },
      userName: { error: "This field is required.", value: "" },
    });
  });
});
