import { useEffect, useState } from "react";

interface IUseHighlight<T> {
  isNew: boolean;
  value: T;
}

interface IUseHighlightOutput {
  highLight: boolean;
}

export const useHighlight = <T>(
  props: IUseHighlight<T>
): IUseHighlightOutput => {
  const [highLight, setHighLight] = useState<boolean>(false);

  useEffect(() => {
    if (props.isNew) setHighLight(true);
    const timeOut = setTimeout(() => {
      setHighLight(false);
    }, 2000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [props.value, props.isNew]);

  return { highLight };
};
