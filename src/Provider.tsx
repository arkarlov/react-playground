import { useMemo, useState } from "react";
import { Context, type UserContextValue } from "./Context";
import { useUserStore } from "./Store";

export const PageOneProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [name, setName] = useState("Local");
  const [age, setAge] = useState(0);

  const contextValue: UserContextValue = useMemo(
    () => ({
      name,
      age,
      setAge,
      setName,
    }),
    [age, name]
  );

  return (
    <Context.Provider value={contextValue}>{children}</Context.Provider>
  );
};

export const PageTwoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const name = useUserStore((state) => state.name);
  const setName = useUserStore((state) => state.setName);
  const age = useUserStore((state) => state.age);
  const setAge = useUserStore((state) => state.setAge);

  const contextValue: UserContextValue = useMemo(
    () => ({
      name,
      age,
      setAge,
      setName,
    }),
    [age, name, setAge, setName]
  );

  return (
    <Context.Provider value={contextValue}>{children}</Context.Provider>
  );
};

export const ProviderWithValueProp = ({
  children,
  contextValue,
}: {
  children: React.ReactNode;
  contextValue: UserContextValue;
}) => {
  return (
    <Context.Provider value={contextValue}>{children}</Context.Provider>
  );
};
