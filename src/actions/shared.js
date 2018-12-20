import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { authenticate } from './authedUser';

import { getInitialData } from "../utils/api";


//Todo: Remove AUTHED_USER in production mode
const _AUTHED_USER = "sarahedo";

export const handleInitialData = () => {
  return dispatch => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(authenticate(_AUTHED_USER));
    });
  };
};
