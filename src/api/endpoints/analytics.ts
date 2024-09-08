import { config } from '~/config/config';
import { post } from '../client';

export async function analyticsBadgeSharing(badgeId: string): Promise<void> {
  return post<void>(`${config.api.analytics}/Events/badgeSharing`, {
    badgeId: badgeId,
    platform: 'Mobile',
  });
}

export async function analyticsCertificateSharing(
  certificateId: string,
): Promise<void> {
  return post<void>(`${config.api.analytics}/Events/certificateSharing`, {
    certificateId: certificateId,
    platform: 'Mobile',
  });
}
