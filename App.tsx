import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from "./src/store/store"
import RootNavController from './src/navigation/RouteNavController'
import { useEffect } from 'react'
import { configureGoogleSignIn } from './src/config/googleAuth'
export default function App() {
  useEffect(() => {
    configureGoogleSignIn()
  }, [])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavController />
      </PersistGate>
    </Provider>
  )
}
