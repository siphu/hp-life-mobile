export enum CourseStatus {
  Published = 'Published',
  Draft = 'Draft',
  Test = 'Test',
  Archived = 'Archived',
}

export interface Pagination<T> {
  page: number;
  pagesCount: number;
  results: Array<T>;
  resultsCount: number;
}

export interface BasicModel {
  id: number;
  name: string;
  /**/
  description?: string;
  body?: string;
  startDate?: any;
  finishDate?: any;
  language?: string;
}

export interface ParticipantBookInfo {
  id: string;
  name: string;
}

export interface Group extends BasicModel {
  creationDate: string;
  userCount: number;
  name: string;
}

export interface AuthToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface Category extends BasicModel {
  language: string;
}

export interface Course extends BasicModel {
  type: string;
  publishDate?: string;
  status?: string;
  groupId?: number;
  groupName?: string;
  group?: Group;
  isGroupMembershipRequired?: boolean;
  isEnrollmentApprovalRequired?: boolean;
  traineeCount?: number;
  coachCount?: number;
  imageUrl?: string;
  userAsCoach: boolean;
  categoryId?: number;
  language?: string;
  progress?: number;
  enrollmentStatus?: string;
  traineeEnrollmentStatus?: string;
  author?: string;
  books?: ParticipantBookInfo[];
}

export interface CourseResult extends Pagination<Course> {}

export interface UserProfile {
  id: number;
  fullName: string;
  preferredName: string;
  email: string;
  emailConfirmed: boolean;
  gender: string;
  isNewsletterEnabled?: boolean;
  phoneNumber?: number;
  phoneNumberConfirmed: boolean;
  language: string;
  timeZone: string;
  country: string;
  picture?: any;
}
export interface Task extends BasicModel {
  type: string;
  assignedTo: string;
  status: string;
  isEnabled: boolean;
  title: string;
  /**/
  isRequired?: boolean;
  score?: number;
  coachValidationRequired?: boolean;
  traineeBody?: string;
  coachBody?: string;
  level?: number;
  order?: number;
  isPrivate?: boolean;
  isResponsePrivate?: boolean;
  minPassingScore?: number;
  isAutoCorrectionEnabled?: boolean;
}

export interface Lesson extends BasicModel {
  id: number;
  status: string;
  level?: number;
  isEnabled: boolean;
  isRequired: boolean;
  tasks: Task[];
  order?: number;
  title?: string;
  /**/
}
export interface TraineeCourse extends Course {
  lastAccessDate: any;
  progress: number;
  certificateUrl?: string;
  lastLessonName?: string;
  lastTaskAssignedTo?: string;
  lastTaskName?: string;
  lastTaskStatus?: string;
  lastTaskType?: string;
  certificateId?: string;
  accountVerified?: boolean;
  lessons: Lesson[];
}

export interface TraineeCourseResult extends Pagination<TraineeCourse> {}

enum AlertType {
  Success = 'Success',
  Error = 'Error',
}
export interface CurrentAlertApiModel {
  id: number;
  type: AlertType;
  message: string;
}

export interface EmailMarketingAccountSetting {
  isNewsletterEnabled: boolean;
}
