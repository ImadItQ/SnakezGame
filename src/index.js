import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import authReducer from "./Store/reducers/auth";
import fetchReducer from "./Store/reducers/fetch";
import regReducer from "./Store/reducers/reg";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  fetch: fetchReducer,
  reg: regReducer
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
registerServiceWorker();
