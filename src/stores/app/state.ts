import {Notification} from '~/api/endpoints';

export interface StoreAppState {
  language: string;
  online: boolean | null;
  notifications: Notification[];
}

export const state: StoreAppState = {
  language: 'en',
  online: null,
  notifications: [],
};
