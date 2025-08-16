import { ContentChildSub } from "./ContentChildSub";
import { useUserContext } from "./userContext";

export const Content = () => {
  const name = useUserContext((ctx) => ctx.name);
  const age = useUserContext((ctx) => ctx.age);

  console.log("Content");

  return (
    <div
      style={{ margin: "10px", padding: "20px", boxShadow: "0 0 3px black" }}
    >
      Age: {age}
      <br />
      Name: {name}
      <ContentChildSub />
    </div>
  );
};
