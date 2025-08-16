import { useContext } from "react";
import { ContentChildSub } from "./ContentChildSub";
import { Context } from "./Context";


export const Content = () => {
  const {name, age} = useContext(Context)

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
