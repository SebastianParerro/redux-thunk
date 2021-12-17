import store from "./redux/store";
import { Provider } from "react-redux";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/router";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <NavBar />
          <Router />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
