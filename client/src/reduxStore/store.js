import {createStore , applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

// reducers is the parent  file of all reducers like

const store = createStore(reducers, compose(applyMiddleware(thunk)))

export default store;