import "./App.scss";

import Header from "@components/Header";
import Router from "@components/Router";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Router></Router>
      </BrowserRouter>
    </div>
  );
};

export default App;
