import { createContext } from "react";

type ListInfo = {
  change: boolean;
  setChange: (c: boolean) => void;
};

export const ListContext = createContext<ListInfo>({
  change: true,
  setChange: () => {},
});
