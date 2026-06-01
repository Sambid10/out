import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/HomeScreen/Home"
import UpdateTodo from "../screens/UpdateTodo"
import { HomeStackParamList } from "./navigationType"
const HomeStackNav = createNativeStackNavigator<HomeStackParamList>()

export default function HomeStack() {
    return (
        <HomeStackNav.Navigator initialRouteName="Home">
            <HomeStackNav.Screen
            options={{
                headerShown:false
            }}
            name="Home" component={Home} />
            <HomeStackNav.Screen 
             options={{
                headerShown:false
            }}
            name="EditTodo" component={UpdateTodo} />
        </HomeStackNav.Navigator>
    )
}