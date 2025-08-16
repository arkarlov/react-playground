import { Aside } from "./Aside";
import { Content } from "./Content";
import { PageTwoProvider } from "./Provider";

export const PageTwo = () => {
  console.log("PageTwo");

  return (
    <div>
      <PageTwoProvider>
        <Aside />
        <Content />
      </PageTwoProvider>
    </div>
  );
};
