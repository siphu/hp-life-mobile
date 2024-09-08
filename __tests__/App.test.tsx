/**
 * @format
 */

import 'react-native';
import React from 'react';
import { App } from '../src/App';
import { screen, fireEvent, render, waitFor } from '@testing-library/react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { stores } from '../src/stores';
import { setToken } from '../src/stores/user/actions';

describe('Un-Authenticated Test', () => {

  test('Loading to the Login Screen', () => {

    const { getByText, debug, getByTestId } = render(<App />);

    expect(getByText('login.message')).toBeTruthy();
    expect(getByText('login.login')).toBeTruthy();
    expect(getByText('login.join')).toBeTruthy();

  });

  test('Testing Language Icon', () => {

    const { getByText, debug, getByTestId } = render(<App />);

    fireEvent.press(getByTestId('language-icon'))

    expect(getByText('English')).toBeTruthy();
    expect(getByText('Français')).toBeTruthy();
    expect(getByText('हिन्दी')).toBeTruthy();
    expect(getByText('Português')).toBeTruthy();
    expect(getByText('Español')).toBeTruthy();
    expect(getByText('中文(简体)')).toBeTruthy();
    expect(getByText('Bahasa Indonesia')).toBeTruthy();

  });

  test('Testing Login button', async () => {
    const { getByText, debug, getByTestId } = render(<App />);
    fireEvent.press(getByText('login.message'));
    expect(InAppBrowser.openAuth)
  });

  test('Testing Join button', async () => {
    const { getByText, debug, getByTestId } = render(<App />);
    fireEvent.press(getByText('login.join'));
    expect(InAppBrowser.open)
  });

});
