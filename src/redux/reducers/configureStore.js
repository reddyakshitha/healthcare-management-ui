import {legacy_createStore as createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { initialState } from './initialState';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './index';


const configureStore = () => {

  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(rootReducer(), initialState, composeWithDevTools(applyMiddleware(thunk)));
    return store;
};

export default configureStore;