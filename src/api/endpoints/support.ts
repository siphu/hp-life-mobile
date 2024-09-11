import { config } from '~/config/config';
import { post } from '../client';

export async function sendSupportMessage(
  email: string,
  body: string,
  name?: string,
  phoneNumber?: string,
  subject?: string,
  topic?:
    | 'FirstTimeLogin'
    | 'General'
    | 'AccountSetup'
    | 'AccountManagement'
    | 'CertificatesAndTranscript'
    | 'GeneralTroubleshooting'
    | 'CourseEnrollment'
    | 'AssistedSupport'
    | 'Comments'
    | 'Suggestions'
    | 'Others',
  priority?: 'Low' | 'Medium' | 'High',
): Promise<void> {
  return post<void>(`${config.api.learning}/api/support/message`, {
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    subject: subject,
    topic: topic,
    priority: priority,
    body: body,
  });
}
