import {createStore, applyMiddleware} from 'redux';
import mainReducer from './reducer/main-reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export default () => {
  return createStore(mainReducer, composeWithDevTools(
    applyMiddleware(thunk)
  ));
};