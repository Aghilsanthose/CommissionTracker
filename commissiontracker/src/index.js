import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import commonReducer from "./Store/Reducers/commonReducer";
import viewInfoReducer from "./Store/Reducers/viewInfoReducer";
import consignmentReducer from "./Store/Reducers/consignmentReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const sampleMiddleware = store => next => action => {
//   const result = next(action);
//   console.log("In sample middleware", result);
//   return next;
// };

const rootReducer = combineReducers({
  common: commonReducer,
  viewInfo: viewInfoReducer,
  consignment: consignmentReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
