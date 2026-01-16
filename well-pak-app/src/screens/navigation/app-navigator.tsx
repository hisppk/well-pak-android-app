import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens in the app

import { navigationRef } from './navigation-utils';
import Welcome from '../welcome'
import Login from '../login'
import Home from '../home'
import Sessions from '../sessions'
import AssessmentDetails from '../assesment-details'
import SessionImdadDetails from '../session-imdad-details'
import SessionDetails from '../session-details'
import { useSelector } from 'react-redux';
import { MainStackParamList } from './types';

const MainAppStack = createNativeStackNavigator<MainStackParamList>();

/**
 * Define core App navigator
 */
const Navigations = () => {
  const { authenticated } = useSelector(({ LHW }: any) => LHW.auth);

  const routeNameRef = useRef<string>();

  const handleNavContainerReady = () => {
    routeNameRef.current = navigationRef.getCurrentRoute()?.name;
  };

  const handleNavStateChanged = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
      // handle Analytics
    }
    routeNameRef.current = currentRouteName;
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer
        ref={navigationRef}
        onReady={handleNavContainerReady}
        onStateChange={handleNavStateChanged}>
        <MainAppStack.Navigator >
          {!authenticated ? <>{AuthFlow}</> : <>{AuthenticatedFlow}</>}
        </MainAppStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const AuthFlow = (
  <MainAppStack.Group
    navigationKey="Auth"
    screenOptions={{
      title: '',
      headerBackTitleVisible: false,
      headerShadowVisible: false,
    }}>
    <MainAppStack.Screen
      name="Welcome"
      component={Welcome}
      options={{ headerShown: false }}
    />
    <MainAppStack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
  </MainAppStack.Group>
);

const AuthenticatedFlow = (
  <MainAppStack.Group
    navigationKey="Auth"
    screenOptions={{
      title: '',
      headerBackTitleVisible: false,
      headerShadowVisible: false,
    }}>
    <MainAppStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <MainAppStack.Screen
      name="Sessions"
      component={Sessions}
      options={{ headerShown: false }}
    />
    <MainAppStack.Screen
      name="SessionDetails"
      component={SessionDetails}
      options={{ headerShown: false }}
    />
    <MainAppStack.Screen
      name="SessionImdadDetails"
      component={SessionImdadDetails}
      options={{
        presentation: 'modal',
        header: () => undefined
      }}

    />
    <MainAppStack.Screen
      name="AssessmentDetails"
      component={AssessmentDetails}
      options={{ headerShown: false }}
    />
  </MainAppStack.Group>
);

export default Navigations;
