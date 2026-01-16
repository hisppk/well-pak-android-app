import { combineReducers } from 'redux';

import LHW from '../redux/reducer';

const createReducer = asyncReducers =>
  combineReducers({
    LHW,
    ...asyncReducers,
  });

export default createReducer;
