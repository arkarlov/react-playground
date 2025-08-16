import { useState } from "react";
import "./App.css";
import { PageOne } from "./PageOne";
import { PageTwo } from "./PageTwo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <div>
        <button onClick={() => setCount(0)}>Page One</button>
        <button onClick={() => setCount(1)}>Page Two</button>
      </div>
      <div>{count === 0 ? <PageOne /> : <PageTwo />}</div>
    </div>
  );
}

export default App;
