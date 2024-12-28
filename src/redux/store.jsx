import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authSlice from './authSlice/authSlice';
import {authState} from './Features/authState';

// Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['Profile', 'stripe'], // Blacklist keys
};

// Combine reducers
const rootReducer = combineReducers({
  [authSlice.reducerPath]: authSlice.reducer, // Correct reducer registration
  userData: authState.reducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authSlice.middleware), // Correct middleware
});

export default store;
export const persistor = persistStore(store);
