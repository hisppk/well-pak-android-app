import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from './navigation/types';

export type ScreenProps<RouteName extends keyof MainStackParamList> = NativeStackScreenProps<
  MainStackParamList,
  RouteName
>;
