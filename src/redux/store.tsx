import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from './rootReducer';

const enhancer = compose(applyMiddleware(thunk));

// Create a Redux store holding the state of the app.
// Its API is { subscribe, dispatch, getState }.
export default createStore(reducers, enhancer);