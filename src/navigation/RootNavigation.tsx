/* eslint-disable react/no-unstable-nested-components */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTodo from '../screens/AddTodo';
import UpdateTodo from '../screens/UpdateTodo';
import { RootStackParamList } from './navigationType';
import Home from '../screens/HomeScreen/Home';
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function RootStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
        >
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name="Home" component={Home} />
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name="AddTodo" component={AddTodo} />
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name="UpdateTodo" component={UpdateTodo} />
        </Stack.Navigator>
    );
}