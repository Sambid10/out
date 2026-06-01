/* eslint-disable react/no-unstable-nested-components */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './navigationType';
import SigninScreen from '../screens/AuthScreen/SigninScreen';
import SignupScreen from '../screens/AuthScreen/SignupScreen';
const Stack = createNativeStackNavigator<AuthStackParamList>();
export default function AuthStack() {
    return (
        <Stack.Navigator
            initialRouteName="SigninScreen"
        >
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name="SigninScreen" component={SigninScreen} />
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name="SignupScreen" component={SignupScreen} />
        </Stack.Navigator>
    );
}