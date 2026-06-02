import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  {setupListeners} from "@reduxjs/toolkit/query"
import AsyncStorage from '@react-native-async-storage/async-storage';
import todoReducer from "./slices/TodoSlice"
import authReducer from "./slices/AuthSlice"
import themeReducer from "./slices/themeSlice"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import { getPostApi } from './api/getPostApi';
import { getInfinite } from './api/getInfinite';

const persistConfig = {
  key: 'root',
storage: AsyncStorage,
  whitelist: ['todos', 'auth'],
};

const rootReducer=combineReducers({
    todos: todoReducer,
    auth:authReducer,
    theme:themeReducer,
    [getPostApi.reducerPath]:getPostApi.reducer,
    [getInfinite.reducerPath]:getInfinite.reducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(getPostApi.middleware).concat(getInfinite.middleware),
})
export const persistor=persistStore(store)

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch