import { createContext } from "react";
import { UserContext } from "./UserContext";

type MealInfo = {
  date: Date;
  setDate: (c: Date) => void;
  group: number;
  setGroup: (c: number) => void;
};

export const MealContext = createContext<MealInfo>({
    date: new Date(),
    setDate: () => {},
    group: 1,
    setGroup: () => {}
});

