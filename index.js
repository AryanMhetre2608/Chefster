/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Store } from './src/Redux/Store';

import { PersistGate } from 'redux-persist/integration/react';

import { persistor } from './src/Redux/Store';
import Loader from './src/Components/Loader';

const Application = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={Store}>
      <PersistGate loading={false} persistor={persistor}>

        <App/>
      </PersistGate>
        
      </Provider>
    </SafeAreaView>
  );
};

AppRegistry.registerComponent(appName, () => Application);
