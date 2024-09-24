import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {DataProvider} from './src/hooks';
import AppNavigation from './src/navigation/RootNavigator';
import store, {persistor} from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DataProvider>
          <AppNavigation />
        </DataProvider>
      </PersistGate>
    </Provider>
  );
}
