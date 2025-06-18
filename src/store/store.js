import { createStore, applyMiddleware } from "redux";
import todoReducer from "./reducer";
import createSagaMiddleware from "redux-saga";
import mySaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(todoReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

export default store;
