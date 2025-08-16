import { ContentChild } from "./ContentChild";

export const ContentChildSub = () => {
  console.log("ContentChildSub");

  return <div style={{ padding: "20px" }}>Sub <ContentChild /></div>;
};
