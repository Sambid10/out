import { NavigatorScreenParams } from '@react-navigation/native';
export type HomeStackParamList = {
  Home: undefined
  EditTodo: { id: string }    
}

export type RootStackParamList = {
  HomeTabs: NavigatorScreenParams<HomeStackParamList> 
  AddTodo: undefined
  Profile:undefined
}

export type AuthStackParamList = {
  SigninScreen: undefined
  SignupScreen: undefined
}