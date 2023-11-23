import { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";

export const useCheckboxState = (state: CheckedState) => {
  const [checked, setChecked] = useState<CheckedState>();

  useEffect(() => {
    setChecked(state);
  }, [state]);

  return checked;
};
