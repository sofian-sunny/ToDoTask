import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {DataProvider} from './src/hooks';
import AppNavigation from './src/navigation/RootNavigator';
import store, {persistor} from './src/redux/store';
import {StatusBar} from 'react-native';
import {useTheme} from './src/hooks';

export default function App() {
  const {colors} = useTheme();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DataProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.primary}
          />
          <AppNavigation />
        </DataProvider>
      </PersistGate>
    </Provider>
  );
}
