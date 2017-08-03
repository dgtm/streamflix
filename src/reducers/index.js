import { combineReducers } from 'redux';
import defaultUriReducer from './defaultUri';
import { emailSent } from './emailLink';

const rootReducer = combineReducers({
  defaultUri: defaultUriReducer,
  mailState: emailSent
})
export default rootReducer;
