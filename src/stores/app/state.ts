import {Dimensions} from 'react-native';
import {Notification} from '~/api/endpoints';

export interface StoreAppState {
  language: string;
  online: boolean | null;
  notifications: Notification[];
  orientation: 'Portrait' | 'Landscape';
  loader: boolean;
}

export const state: StoreAppState = {
  language: 'en',
  online: null,
  notifications: [],
  orientation:
    Dimensions.get('screen').width > Dimensions.get('screen').height
      ? 'Landscape'
      : 'Portrait',
  loader: false,
};
