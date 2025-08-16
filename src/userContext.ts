import { createContext, useContext } from "react";

export type UserContextValue = {
  name: string;
  age: number;
  setName: (v: string) => void;
  setAge: (v: number) => void;
};

export const UserContext = createContext<UserContextValue>({
  name: "",
  age: 0,
  setName: () => {},
  setAge: () => {},
});

export const useUserContext = <T>(
  selector: (ctx: UserContextValue) => T
): T => {
  const ctx = useContext(UserContext);

  // if (!ctx) {
  //   throw new Error("UserContext is not defined");
  // }

  return selector(ctx);
};
