import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PokemonListScreen from '../../src/screens/PokemonScreen/List';
import PokemonDetailScreen from '../../src/screens/PokemonScreen/Detail';
import store from '../../src/store/store';

type RootStackParamList = {
  PokemonList: undefined;
  PokemonDetail: {name: string};
};

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Provider store={store} testID="provider-component">
      <NavigationContainer testID="main-navigator">
        <Stack.Navigator
          initialRouteName="PokemonList"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="PokemonList" component={PokemonListScreen} />
          <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default MainNavigator;
