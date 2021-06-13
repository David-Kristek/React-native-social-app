import { Providers } from "./src/context/Provider";
import React from "react";
import { Provider } from "react-redux";
// import { createStore, applyMiddleware } from "redux";
// import reducers from "./src/redux/reducers";

// const store = createStore(
//   reducers
// );

export default function App() {
  return (
      <Providers />
  );
}
