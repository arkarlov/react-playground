import { useContext } from "react";
import { Context } from "./Context";


export const ContentChild = () => {
  const {age} = useContext(Context);

  console.log("ContentChild");

  return <div style={{ padding: "20px" }}>SubAge: {age}</div>;
};
