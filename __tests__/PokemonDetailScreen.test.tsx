// import React from 'react';
// import {render, screen, waitFor} from '@testing-library/react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {useRoute} from '@react-navigation/native';
// import {useGetPokemonDetailsQuery} from '../src/api/pokemonApi';
// import PokemonDetailScreen from '../src/screens/PokemonScreen/Detail';

// // Mock the `useGetPokemonDetailsQuery` hook
// jest.mock('../src/api/pokemonApi', () => ({
//   useGetPokemonDetailsQuery: jest.fn(),
// }));

import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useRoute} from '@react-navigation/native';
import {useGetPokemonDetailsQuery} from '../src/api/pokemonApi';
import PokemonDetailScreen from '../src/screens/PokemonScreen/Detail';

// Mock the `useGetPokemonDetailsQuery` hook
jest.mock('../src/api/pokemonApi', () => ({
  useGetPokemonDetailsQuery: jest.fn(),
}));

// Mock the `useRoute` hook
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: jest.fn(),
}));

const Stack = createNativeStackNavigator();

const renderWithNavigation = (component: React.ReactElement) =>
  render(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PokemonDetail" component={() => component} />
      </Stack.Navigator>
    </NavigationContainer>,
  );

describe('PokemonDetailScreen', () => {
  it('displays loading spinner while fetching data', () => {
    // Mock the useRoute hook to return the expected params
    (useRoute as jest.Mock).mockReturnValue({
      params: {name: 'bulbasaur'},
    });

    // Mock useGetPokemonDetailsQuery to simulate loading state
    (useGetPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderWithNavigation(<PokemonDetailScreen />);

    // Check if the loading spinner and text are shown
    expect(screen.getByText('Loading Pokémon details...')).toBeTruthy();

    // Check if the loading spinner is rendered by testID
    expect(screen.getByTestId('loading-spinner')).toBeTruthy();
  });

  it('displays error message if fetching data fails', () => {
    // Mock the useRoute hook to return the expected params
    (useRoute as jest.Mock).mockReturnValue({
      params: {name: 'bulbasaur'},
    });

    // Mock useGetPokemonDetailsQuery to simulate error state
    (useGetPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    renderWithNavigation(<PokemonDetailScreen />);

    // Check if error message is shown
    expect(screen.getByText('Error fetching Pokémon details.')).toBeTruthy();
  });

  it('renders the Pokémon details when data is available', async () => {
    // Mock the useRoute hook to return the expected params
    (useRoute as jest.Mock).mockReturnValue({
      params: {name: 'bulbasaur'},
    });

    const mockPokemonDetails = {
      name: 'bulbasaur',
      height: 70,
      weight: 6.9,
      types: [{type: {name: 'grass'}}, {type: {name: 'poison'}}],
    };

    // Mock useGetPokemonDetailsQuery to simulate successful response
    (useGetPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: mockPokemonDetails,
      isLoading: false,
      error: null,
    });

    renderWithNavigation(<PokemonDetailScreen />);

    // Check if Pokémon name, height, weight, and types are rendered
    expect(screen.getByText('BULBASAUR')).toBeTruthy();
    expect(screen.getByText('Height:')).toBeTruthy();
    expect(screen.getByText('70 cm')).toBeTruthy();
    expect(screen.getByText('Weight:')).toBeTruthy();
    expect(screen.getByText('6.9 kg')).toBeTruthy();
    expect(screen.getByText('Types:')).toBeTruthy();
    expect(screen.getByText('GRASS')).toBeTruthy();
    expect(screen.getByText('POISON')).toBeTruthy();
  });

  it('handles missing data gracefully', () => {
    // Mock the useRoute hook to return the expected params
    (useRoute as jest.Mock).mockReturnValue({
      params: {name: 'bulbasaur'},
    });

    // Mock useGetPokemonDetailsQuery to simulate missing data
    (useGetPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    renderWithNavigation(<PokemonDetailScreen />);

    // Check if error message is shown
    expect(screen.getByText('Error fetching Pokémon details.')).toBeTruthy();
  });
});
