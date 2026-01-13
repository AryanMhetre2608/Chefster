/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Store } from './src/redux/Store';

import { PersistGate } from 'redux-persist/integration/react';

import { persistor } from './src/redux/Store';
import Loader from './src/components/Loader';
import Login from './src/screens/Login'
import Registration from './src/screens/Registration'


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
