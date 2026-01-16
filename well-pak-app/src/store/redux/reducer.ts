import { combineReducers } from 'redux';

import auth from '../auth/AuthReducers';

const LHW = combineReducers({
  auth,
});

export default LHW;
