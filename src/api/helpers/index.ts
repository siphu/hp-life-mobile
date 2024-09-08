import { clearCourseCacheTimer } from './courseHelpers';
import { clearUserCacheTimer } from './userHelper';

export * from './courseHelpers';
export * from './userHelper';

export const clearCacheTimer = () => {
  clearCourseCacheTimer();
  clearUserCacheTimer();
};
