import {AuthActionTypes} from './../redux/actionTypes';
import {AuthState} from '../redux/state';

const INITIAL_STATE: AuthState = {
  user: {},
  authenticated: false,
  patients: [],
  sessions: [],
  selectedPatient: {},
  selectedSessionDetails: {},
  selectedAssessmentDetails: {},
  isAlreadyRecoding: false,
  loading: false,
};
interface Action {
  payload: any;
  type: string;
}
const AuthReducer = (
  state: AuthState = INITIAL_STATE,
  action: Action,
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_USER_START: {
      return {...state, loading: true};
    }
    case AuthActionTypes.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        authenticated: true,
        user: action.payload.user,
        loading: false,
      };
    }
    case AuthActionTypes.LOGIN_USER_FAIL: {
      return {
        ...state,
        authenticated: false,
        loading: false,
      };
    }
    case AuthActionTypes.GET_LADY_HEALTH_WORKER_PATIENTS_START: {
      return {...state, loading: true};
    }
    case AuthActionTypes.GET_LADY_HEALTH_WORKER_PATIENTS_SUCCESS: {
      return {
        ...state,
        patients: action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.GET_LADY_HEALTH_WORKER_PATIENTS_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.GET_SESSIONS_LIST_START: {
      return {...state, loading: true};
    }
    case AuthActionTypes.GET_SESSIONS_LIST_SUCCESS: {
      return {
        ...state,
        sessions: action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.GET_SESSIONS_LIST_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.GET_SESSION_DETAILS_START: {
      return {...state, loading: true};
    }
    case AuthActionTypes.GET_SESSION_DETAILS_SUCCESS: {
      const obectKeys=Object.keys(action.payload)
      obectKeys?.pop()
      const transformedArray=obectKeys?.map((item)=>action.payload[item])
const updatedResponse={
  sessiondetails: transformedArray,
  'patient-session':action?.payload?.['patient-session']
}
      return {
        ...state,
        selectedSessionDetails: updatedResponse,
        loading: false,
      };
    }
    case AuthActionTypes.GET_SESSION_DETAILS_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.GET_ASSESSMENT_DETAILS_START: {
      return {...state, loading: true};
    }
    case AuthActionTypes.GET_ASSESSMENT_DETAILS_SUCCESS: {
      return {
        ...state,
        selectedAssessmentDetails: action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.GET_ASSESSMENT_DETAILS_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.SUBMIT_ASSESSMENT_START: {
      return {...state, loading: true};
    }
    case AuthActionTypes.SUBMIT_ASSESSMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.SUBMIT_ASSESSMENT_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.SUBMIT_SESSION_START: {
      return {...state, loading: true};
    }
    case AuthActionTypes.SUBMIT_SESSION_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.SUBMIT_SESSION_FAIL: {
      return {...state, loading: true};
    }
    case AuthActionTypes.START_RECORDING: {
      return {
        ...state,
        isAlreadyRecoding: action.payload,
      };
    }
    case AuthActionTypes.SET_SELECTED_PATIENT: {
      return {
        ...state,
        selectedPatient: action.payload,
        loading: false,
      };
    }

    case AuthActionTypes.LOGOUT_USER: {
      return {
        ...state,
        user: {},
        authenticated: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
