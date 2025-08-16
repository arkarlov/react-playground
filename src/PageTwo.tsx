import { Aside } from "./Aside";
import { Content } from "./Content";
import { PageTwoUserProvider } from "./Provider";

export const PageTwo = () => {
  console.log("PageTwo");

  return (
    <div>
      <PageTwoUserProvider>
        <Aside />
        <Content />
      </PageTwoUserProvider>
    </div>
  );
};
