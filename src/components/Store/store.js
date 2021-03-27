import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducer/reducer';

const middleware = [thunk];

const store = createStore(reducer, compose(applyMiddleware(...middleware)));

export default store;
