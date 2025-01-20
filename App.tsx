import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import MainNavigator from './core/navigation/MainNavigator';

const App = () => (
  <Provider store={store}>
    <MainNavigator testID="main-navigator" />
  </Provider>
);

export default App;
