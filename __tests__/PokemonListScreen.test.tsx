import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useGetPokemonListQuery} from '../src/api/pokemonApi';
import PokemonListScreen from '../src/screens/PokemonScreen/List';

// Mock the `useGetPokemonListQuery` hook
jest.mock('../src/api/pokemonApi', () => ({
  useGetPokemonListQuery: jest.fn(),
}));

const Stack = createNativeStackNavigator();

const renderWithNavigation = (component: React.ReactElement) =>
  render(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PokemonList" component={() => component} />
      </Stack.Navigator>
    </NavigationContainer>,
  );

describe('PokemonListScreen', () => {
  it('displays loading text while fetching data', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderWithNavigation(<PokemonListScreen />);

    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('displays an error message if fetching data fails', () => {
    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    renderWithNavigation(<PokemonListScreen />);

    expect(screen.getByText('Error fetching Pokémon list.')).toBeTruthy();
  });

  it('renders the Pokémon list when data is available', () => {
    const mockPokemonList = {
      results: [{name: 'bulbasaur'}, {name: 'charmander'}, {name: 'squirtle'}],
    };

    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: mockPokemonList,
      isLoading: false,
      error: null,
    });

    renderWithNavigation(<PokemonListScreen />);

    expect(screen.getByText('Pokémon List')).toBeTruthy();
    expect(screen.getByText('BULBASAUR')).toBeTruthy();
    expect(screen.getByText('CHARMANDER')).toBeTruthy();
    expect(screen.getByText('SQUIRTLE')).toBeTruthy();
  });

  it('applies alternating row colors correctly', () => {
    const mockPokemonList = {
      results: [{name: 'bulbasaur'}, {name: 'charmander'}, {name: 'squirtle'}],
    };

    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: mockPokemonList,
      isLoading: false,
      error: null,
    });

    const {getByTestId} = renderWithNavigation(<PokemonListScreen />);

    // Verify row colors
    expect(getByTestId('pokemon-row-0').props.style.backgroundColor).toBe(
      '#d0f0fd',
    ); // First row
    expect(getByTestId('pokemon-row-1').props.style.backgroundColor).toBe(
      '#fffacd',
    ); // Second row
    expect(getByTestId('pokemon-row-2').props.style.backgroundColor).toBe(
      '#d3f9d8',
    ); // Third row
  });

  it('navigates to the Pokémon detail screen when a Pokémon is pressed', () => {
    const mockPokemonList = {
      results: [{name: 'bulbasaur'}],
    };

    (useGetPokemonListQuery as jest.Mock).mockReturnValue({
      data: mockPokemonList,
      isLoading: false,
      error: null,
    });

    const mockNavigate = jest.fn();
    const mockProps: any = {
      navigation: {navigate: mockNavigate},
    };

    const {getByText} = render(<PokemonListScreen {...mockProps} />);

    fireEvent.press(getByText('BULBASAUR'));

    expect(mockNavigate).toHaveBeenCalledWith('PokemonDetail', {
      name: 'bulbasaur',
    });
  });
});
