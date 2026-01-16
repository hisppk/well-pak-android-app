import {
  getAssessmentDetailsUrl,
  getLadyHealthWorkerPatientsUrl,
  getSessionDetailsUrl,
  getSessionsListUrl,
  getSubmitAssessmentUrl,
  getSubmitSessionUrl,
  loginUserUrl,
} from '../../api/Endpoint';
import StorageHelper from 'utils/helpers/StorageHelper';
import {axiosInstance as axios} from '../../api/axios';
import {AuthActionTypes} from '../redux/actionTypes';
import {navigationRef} from 'screens/navigation';

export const submitLogin = (email, pass) => {
  return dispatch => {
    dispatch({
      type: AuthActionTypes.LOGIN_USER_START,
    });
    const url = loginUserUrl(email, pass);
    axios
      .post(url)
      .then(res => {
        let {data} = res;
        if (data.access_token && data.access_token !== 'undefined') {
          loginUserSuccess(dispatch, data);
        } else {
          loginUserFail(dispatch, 'There was an error connection');
        }
      })
      .catch(error => {
        if (error?.response?.data?.error === 'Unauthorized') {
          alert('Invalid Credentials');
        }
        loginUserFail(dispatch, 'There was an error connection2');
      });
  };
};
const loginUserFail = (dispatch, errorMessage) => {
  dispatch({
    type: AuthActionTypes.LOGIN_USER_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const loginUserSuccess = (dispatch, data) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + data?.access_token;
  StorageHelper.saveItem(
    StorageHelper.StorageKeys.USER_ID,
    data?.user?.id?.toString(),
  );
  StorageHelper.saveItem(
    StorageHelper.StorageKeys.Access_Token,
    data?.access_token?.toString(),
  );

  dispatch({
    type: AuthActionTypes.LOGIN_USER_SUCCESS,
    payload: data,
  });
};

export const getLadyHealthWorkerPatients = () => {
  return dispatch => {
    dispatch({
      type: AuthActionTypes.GET_LADY_HEALTH_WORKER_PATIENTS_START,
    });
    const url = getLadyHealthWorkerPatientsUrl();
    axios
      .get(url)
      .then(res => {
        let {data} = res;
        if (data?.data?.length > 0) {
          getLadyHealthWorkerPatientsSuccess(dispatch, data?.data);
        } else {
          getLadyHealthWorkerPatientsFail(
            dispatch,
            'There was an error connection',
          );
        }
      })
      .catch(error => {
        getLadyHealthWorkerPatientsFail(
          dispatch,
          'There was an error connection2',
        );
      });
  };
};
const getLadyHealthWorkerPatientsFail = (dispatch, errorMessage) => {
  dispatch({
    type: AuthActionTypes.GET_LADY_HEALTH_WORKER_PATIENTS_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getLadyHealthWorkerPatientsSuccess = (dispatch, data) => {
  dispatch({
    type: AuthActionTypes.GET_LADY_HEALTH_WORKER_PATIENTS_SUCCESS,
    payload: data,
  });
};

export const getSessionsList = (patientId: string) => {
  return dispatch => {
    dispatch({
      type: AuthActionTypes.GET_SESSIONS_LIST_START,
    });
    const url = getSessionsListUrl(patientId);
    axios
      .get(url)
      .then(res => {
        let {data} = res;
        if (data?.data?.length > 0) {
          getSessionsListSuccess(dispatch, data?.data);
        } else {
          getSessionsListFail(dispatch, 'There was an error connection');
        }
      })
      .catch(error => {
        getSessionsListFail(dispatch, 'There was an error connection2');
      });
  };
};
const getSessionsListFail = (dispatch, errorMessage) => {
  dispatch({
    type: AuthActionTypes.GET_SESSIONS_LIST_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getSessionsListSuccess = (dispatch, data) => {
  dispatch({
    type: AuthActionTypes.GET_SESSIONS_LIST_SUCCESS,
    payload: data,
  });
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: AuthActionTypes.LOGOUT_USER,
    });
  };
};

export const startRecodingGlobal = value => {
  return dispatch => {
    dispatch({
      type: AuthActionTypes.START_RECORDING,
      payload: value,
    });
  };
};

export const setSelectedPatient = patient => {
  return dispatch => {
    dispatch({
      type: AuthActionTypes.SET_SELECTED_PATIENT,
      payload: patient,
    });
  };
};

export const getSessionDetails = (id, patientId) => {
  return dispatch => {
    dispatch({
      type: AuthActionTypes.GET_SESSION_DETAILS_START,
    });
    const url = getSessionDetailsUrl(id, patientId);
    axios
      .get(url)
      .then(res => {
        let {data} = res;
        if (data?.data) {
          getSessionDetailsSuccess(dispatch, data?.data);
        } else {
          getSessionDetailsFail(dispatch, 'There was an error connection');
        }
      })
      .catch(error => {
        getSessionDetailsFail(dispatch, 'There was an error connection2');
      });
  };
};
const getSessionDetailsFail = (dispatch, errorMessage) => {
  dispatch({
    type: AuthActionTypes.GET_SESSION_DETAILS_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getSessionDetailsSuccess = (dispatch, data) => {
  dispatch({
    type: AuthActionTypes.GET_SESSION_DETAILS_SUCCESS,
    payload: data,
  });
};

export const getAssessmentDetails = (id, patientId) => {
  return dispatch => {
    dispatch({
      type: AuthActionTypes.GET_ASSESSMENT_DETAILS_START,
    });
    const url = getAssessmentDetailsUrl(id, patientId);
    axios
      .get(url)
      .then(res => {
        let {data} = res;
        if (data?.data) {
          getAssessmentDetailsSuccess(dispatch, data?.data);
        } else {
          getAssessmentDetailsFail(dispatch, 'There was an error connection');
        }
      })
      .catch(error => {
        getAssessmentDetailsFail(dispatch, 'There was an error connection2');
      });
  };
};
const getAssessmentDetailsFail = (dispatch, errorMessage) => {
  dispatch({
    type: AuthActionTypes.GET_ASSESSMENT_DETAILS_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getAssessmentDetailsSuccess = (dispatch, data) => {
  dispatch({
    type: AuthActionTypes.GET_ASSESSMENT_DETAILS_SUCCESS,
    payload: data,
  });
};

export const submitAssessment = answeredData => {
  return dispatch => {
    dispatch({
      type: AuthActionTypes.SUBMIT_ASSESSMENT_START,
    });
    const url = getSubmitAssessmentUrl();
    axios
      .post(url, answeredData)
      .then(res => {
        let {data} = res;
        if (data) {
          submitAssessmentSuccess(dispatch, data, answeredData?.patient_id);
        } else {
          submitAssessmentFail(dispatch, 'There was an error connection');
        }
      })
      .catch(error => {
        submitAssessmentFail(dispatch, 'There was an error connection2');
      });
  };
};
const submitAssessmentFail = (dispatch, errorMessage) => {
  dispatch({
    type: AuthActionTypes.SUBMIT_ASSESSMENT_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const submitAssessmentSuccess = (dispatch, data, patientId) => {
  dispatch({
    type: AuthActionTypes.SUBMIT_ASSESSMENT_SUCCESS,
    payload: data,
  });
  dispatch(getSessionsList(patientId));
  alert('سائکلوپس مکمل ہو گیا ہے۔');
  dispatch(getLadyHealthWorkerPatients());
  navigationRef.goBack();
};

export const submitSession = sessionData => {
  return dispatch => {
    dispatch({
      type: AuthActionTypes.SUBMIT_SESSION_START,
    });
    const url = getSubmitSessionUrl();

    axios
      .post(url, sessionData)
      .then(res => {
        let {data} = res;
        if (data) {
          submitSessionSuccess(dispatch, data, sessionData?.patient_id);
        } else {
          submitSessionFail(dispatch, 'There was an error connection');
        }
      })
      .catch(error => {
        submitSessionFail(dispatch, 'There was an error connection2');
      });
  };
};
const submitSessionFail = (dispatch, errorMessage) => {
  dispatch({
    type: AuthActionTypes.SUBMIT_SESSION_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const submitSessionSuccess = (dispatch, data, patientId) => {
  dispatch({
    type: AuthActionTypes.SUBMIT_SESSION_SUCCESS,
    payload: data,
  });
  dispatch(getSessionsList(patientId));
  alert('سیشن مکمل ہو گیا ہے۔');
  dispatch(getLadyHealthWorkerPatients());
  navigationRef.goBack();
};
