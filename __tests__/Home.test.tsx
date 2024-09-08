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


describe('Authenticated Test', () => {

    test('Home Screen', () => {

        stores.dispatch(setToken('mock_token'));

        const { getByText, debug, getByTestId } = render(<App />);

        //expect to see side menu
        expect(getByText('sideMenu.manageAccount')).toBeTruthy();
        expect(getByText('sideMenu.hpFoundation')).toBeTruthy();

        //expect to see header
        expect(getByTestId('header-menu-icon')).toBeTruthy();

        //expect to see home 
        expect(getByText('home.latestCourse')).toBeTruthy();

        //expect to see bottom tab 
        expect(getByText('menu.home')).toBeTruthy();
        expect(getByText('menu.myCourse')).toBeTruthy();
        expect(getByText('menu.explore')).toBeTruthy();

    });


    test('My Dashboard', () => {
        stores.dispatch(setToken('mock_token'));
        const { getByText, debug, getByTestId } = render(<App />);
        fireEvent.press(getByText('menu.myCourse'))
        expect(getByText('myCourse.noCourse')).toBeTruthy();
    });

    test('Explore', () => {
        stores.dispatch(setToken('mock_token'));
        const { getByText, debug, getByTestId } = render(<App />);
        fireEvent.press(getByText('menu.explore'))
        expect(getByText('explore.newest')).toBeTruthy();
        expect(getByText('explore.popular')).toBeTruthy();
    });


});
