import { Aside } from "./Aside";
import { Content } from "./Content";
import { PageOneUserProvider } from "./Provider";

export const PageOne = () => {
  console.log("PageOne");

  return (
    <div>
      <PageOneUserProvider>
        <Aside />
        <Content />
      </PageOneUserProvider>
    </div>
  );
};
