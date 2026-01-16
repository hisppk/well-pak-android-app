export const BASE = 'api end point';

export const loginUserUrl = (email, pass) => {
  return encodeURI(`login?email=${email}&password=${pass}`);
};

export const logoutUserUrl = () => {
  return encodeURI(`logout`);
};

export const getLadyHealthWorkerProfileUrl = () => {
  return encodeURI(`lhwprofile`);
};

export const getLadyHealthWorkerPatientsUrl = () => {
  return encodeURI(`lhw-patients`);
};

export const getSessionsListUrl = id => {
  return encodeURI(`all-sessions/${id}`);
};

export const getSessionDetailsUrl = (id, patientId) => {
  return encodeURI(`sessions-details/${id}/${patientId}`);
};

export const getAssessmentDetailsUrl = (id, patientId) => {
  return encodeURI(`sessions-assessment/${id}/${patientId}`);
};

export const getSubmitAssessmentUrl = () => {
  return encodeURI(`sessions-assessment-submit`);
};

export const getSubmitSessionUrl = () => {
  return encodeURI(`sessions-complete`);
};
