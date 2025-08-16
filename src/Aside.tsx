import { useContext } from "react";
import { Context } from "./Context";

export const Aside = () => {
  const {name, age, setAge} = useContext(Context)

  console.log("Aside");

  return (
    <div
      style={{ margin: "10px", padding: "20px", boxShadow: "0 0 3px black" }}
    >
      Name: {name}
      <br />
      <button onClick={() => setAge(age + 1)}>satAge</button>
    </div>
  );
};
