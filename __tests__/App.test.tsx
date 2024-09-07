/**
 * @format
 */

import 'react-native';
import React from 'react';
import { App } from '../src/App';
import { render } from '@testing-library/react-native';



test('Default App Build and Login Page', () => {
  const { getByText, debug } = render(<App />);
  expect(getByText('login.message')).toBeTruthy();
  expect(getByText('login.login')).toBeTruthy();
  expect(getByText('login.join')).toBeTruthy();
});