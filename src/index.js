import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { StylesProvider } from "@material-ui/styles";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StylesProvider injectFirst>
        <App />
      </StylesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
