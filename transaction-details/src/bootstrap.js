import App from "./App";
import React from "react";
import { Provider } from "react-redux";
import { store } from "host/store";

import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
if (root) {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
