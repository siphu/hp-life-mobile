export interface Pagination<T> {
  page: number;
  pagesCount: number;
  results?: Array<T>;
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

export interface CourseResult extends Pagination<Course> {
  results: Course[];
}

export interface UserProfile {
  id: number;
  fullName: string;
  preferredName: string;
  email: string;
  emailConfirmed: boolean;
  gender: string | number;
  isNewsletterEnabled?: boolean;
  phoneNumber?: number;
  phoneNumberConfirmed: boolean;
  language: string;
  timeZone: string;
  country: string;
  picture?: any;
}
