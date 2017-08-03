// export default function() {
//   return { sentEmail: false, alreadySubscribed: false };
// }
import { SUBMIT_EMAIL } from '../actions/index';
import { SHOW_EMAIL } from '../actions/index';

const initialState =  {
  visible: false,
  sentEmail: false,
  alreadySubscribed: false
};
export function emailSent(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_EMAIL:
      return {
        ...state, sentEmail: true, visible: false
      }
    case SHOW_EMAIL:
      return {
        ...state, visible: true
      }
    default:
      return state
  }
}
