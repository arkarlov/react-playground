import { useUserContext } from "./userContext";

export const ContentChild = () => {
  const age = useUserContext((ctx) => ctx.age);

  console.log("ContentChild");

  return <div style={{ padding: "20px" }}>SubAge: {age}</div>;
};
