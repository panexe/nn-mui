import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "@fontsource/roboto-mono";

ReactDOM.render(
  <Provider store={store}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <App />
  </Provider>,
  document.querySelector("#root")
);
