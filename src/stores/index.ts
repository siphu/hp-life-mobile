import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { reducers as reducerApp } from './app/reducers';
import { reducers as reducerUser } from './user/reducers';
import { reducers as reducerCourse } from './course/reducers';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistAppConfig = {
  key: 'app',
  storage: AsyncStorage,
  whitelist: ['language', 'notifications'],
};

const persistUserConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: [
    'token',
    'profile',
    'badges',
    'preferencePushNotification',
    'pushRegistered',
  ],
};

const persistCourseConfig = {
  key: 'course',
  storage: AsyncStorage,
  whitelist: ['categories', 'latest', 'enrolled', 'available'],
};

const rootReducer = combineReducers({
  app: persistReducer(persistAppConfig, reducerApp),
  user: persistReducer(persistUserConfig, reducerUser),
  course: persistReducer(persistCourseConfig, reducerCourse),
});

export const stores = configureStore({
  devTools: false,
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 100,
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: {
        warnAfter: 100,
      },
    }),
});

//@ts-expect-error
export const persistor = persistStore(stores);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof stores.dispatch;
