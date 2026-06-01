import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import RootStack from './RootNavigation'
import AuthStack from './AuthNaviagtion'
import { ThemeProvider } from '../context/ThemeContext'
import SplashScreen from '../components/SplashScreen'

export default function RootNavController() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((u) => {
            setUser(u)
            if (loading) setLoading(false)
        })

        return unsubscribe
    }, [])

    if (loading) return <SplashScreen />

    return (
        <>
            <ThemeProvider>
                <NavigationContainer>
                    {user ? <RootStack /> : <AuthStack />}
                </NavigationContainer>
            </ThemeProvider>
        </>

    )
}