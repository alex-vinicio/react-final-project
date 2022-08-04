import "./App.css";
import { BrowserRouter } from "react-router-dom";
import ContainerLayoutComp from "./Components/ContainerLayoutComp";

function App() {
  return (
    <BrowserRouter>
      <ContainerLayoutComp />
    </BrowserRouter>
  );
}

export default App;
