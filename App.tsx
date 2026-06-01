import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from "./src/store/store"
import RootNavController from './src/navigation/RouteNavController'
import { useEffect } from 'react'
import { configureGoogleSignIn } from './src/config/googleAuth'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
export default function App() {
  useEffect(() => {
    configureGoogleSignIn()
  }, [])
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <RootNavController />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  )
}
