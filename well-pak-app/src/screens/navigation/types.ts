export type MainStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Home: undefined;
  Sessions: undefined;
  SessionDetails: {title?: string; sessionId?: any; isComplete?: boolean};
  SessionImdadDetails: {title?: string; sessionId?: any; isComplete?: boolean};
  AssessmentDetails: {sessionId?: any; isComplete?: boolean};
};
