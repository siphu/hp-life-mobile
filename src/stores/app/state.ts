export interface StoreAppState {
  language: string;
  online: boolean | null;
}

export const state: StoreAppState = {
  language: 'en',
  online: null,
};
