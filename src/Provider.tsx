import { useMemo, useState } from "react";
import { UserContext, type UserContextValue } from "./userContext";
import { useUserStore } from "./userStore";

export const PageOneUserProvider = ({
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
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const PageTwoUserProvider = ({
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
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const UserProviderWithValueProp = ({
  children,
  contextValue,
}: {
  children: React.ReactNode;
  contextValue: UserContextValue;
}) => {
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
