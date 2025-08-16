import { createContext } from "react";

export type UserContextValue = {
  name: string;
  age: number;
  setName: (v: string) => void;
  setAge: (v: number) => void;
};

export const Context = createContext<UserContextValue>({
  name: "",
  age: 0,
  setName: () => {},
  setAge: () => {},
});

