import { useUserContext } from "./userContext";

export const Aside = () => {
  const name = useUserContext((ctx) => ctx.name);
  const age = useUserContext((ctx) => ctx.age);
  const satAge = useUserContext((ctx) => ctx.setAge);

  console.log("Aside");

  return (
    <div
      style={{ margin: "10px", padding: "20px", boxShadow: "0 0 3px black" }}
    >
      Name: {name}
      <br />
      <button onClick={() => satAge(age + 1)}>satAge</button>
    </div>
  );
};
