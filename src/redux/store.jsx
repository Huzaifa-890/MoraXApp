import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from './auth/auth';
import {authState} from './Features/authState';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['Profile', 'stripe'],
};

// Combine your reducers
const rootReducer = combineReducers({
  [auth.reducerPath]: auth.reducer,
  userData: authState,
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure your store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(auth.middleware),
});

export default store;
export const persistor = persistStore(store);
