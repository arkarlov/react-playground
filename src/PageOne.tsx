import { Aside } from "./Aside";
import { Content } from "./Content";
import { PageOneProvider } from "./Provider";

export const PageOne = () => {
  console.log("PageOne");

  return (
    <div>
      <PageOneProvider>
        <Aside />
        <Content />
      </PageOneProvider>
    </div>
  );
};
