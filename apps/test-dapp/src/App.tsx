import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { useLocalStorage } from "@talismn/connect-ui";
import "./App.css";
import { WalletSelect } from "@talismn/connect-components";

function App() {
  const [count, setCount] = useState(0);

  const [name, setName] = useLocalStorage("HI");

  useEffect(() => {
    setName(count.toString());
  }, [count]);

  return (
    <div className="App">
      <WalletSelect
      dappName={"Talisman"}
      triggerComponent={
        <a>hi</a>
      }
    />
    </div>
  );
}

export default App;
