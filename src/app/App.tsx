import { useState } from "react";
import "./styles/App.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div></div>
      <h1>Vite + React</h1>
      <div>{import.meta.env.VITE_APP_BASE_URL}</div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
