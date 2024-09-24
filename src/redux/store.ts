import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import todoReducer from './slice/todoSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Use AsyncStorage to persist state
};

const persistedTodoReducer = persistReducer(persistConfig, todoReducer);

const store = configureStore({
  reducer: {
    todos: persistedTodoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//Writing these here to prevent defining the types in every file
export const useAppDispatch = () => useDispatch<AppDispatch>(); //This is used to perform action
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
// Used to get the data from the store in the component
// Create a persistor
export const persistor = persistStore(store);
export default store;
