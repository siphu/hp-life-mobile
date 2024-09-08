import { clearCourseCacheTimer } from './courseHelpers';
import { clearUserCacheTimer } from './userHelper';

export * from './courseHelpers';
export * from './userHelper';
export * from './appHelpers';

export const clearCacheTimer = () => {
  clearCourseCacheTimer();
  clearUserCacheTimer();
};
