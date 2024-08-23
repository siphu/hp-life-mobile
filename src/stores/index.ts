import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {reducers as reducerApp} from './app/reducers';
import {reducers as reducerUser} from './user/reducers';
import {reducers as reducerCourse} from './course/reducers';
import {configureStore} from '@reduxjs/toolkit';
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
  whitelist: ['language'],
};

const persistUserConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['token', 'profile'],
};

const persistCourseConfig = {
  key: 'course',
  storage: AsyncStorage,
  whitelist: ['categories', 'latest'],
};

const persistRootConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['app', 'user'],
};

const rootReducer = combineReducers({
  app: persistReducer(persistAppConfig, reducerApp),
  user: persistReducer(persistUserConfig, reducerUser),
  course: persistReducer(persistCourseConfig, reducerCourse),
});

//@ts-ignore
const persistedReducer = persistReducer(persistRootConfig, rootReducer);

export const stores = configureStore({
  devTools: false,
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

//@ts-ignore
export const persistor = persistStore(stores);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof stores.dispatch;
