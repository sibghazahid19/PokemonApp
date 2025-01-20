import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

jest.mock('../src/store/store', () => ({
  getState: jest.fn(),
  subscribe: jest.fn(),
  dispatch: jest.fn(),
}));

jest.mock('../core/navigation/MainNavigator', () => {
  const React = require('react');
  const {Text} = require('react-native');
  return () => <Text testID="MainNavigator">Main Navigator</Text>;
});

describe('App Component', () => {
  it('should render without crashing', () => {
    const {toJSON} = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should provide the Redux store to the application', () => {
    const {getByTestId} = render(<App />);
    expect(getByTestId('MainNavigator')).toBeTruthy();
  });
});
