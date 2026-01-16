import {User} from 'models';

declare global {
  interface AuthState {
    user: User;
    authenticated?: boolean;
    patients?: any;
    sessions?: any;
    selectedPatient?: any;
    selectedSessionDetails?: any;
    selectedAssessmentDetails?: any;
    isAlreadyRecoding?: boolean;
    loading?: boolean;
  }
}
export {AuthState};
