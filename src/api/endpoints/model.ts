/* eslint-disable @typescript-eslint/no-explicit-any */
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
  isTrainee: boolean;
  isCoach: boolean;
  hasCertificate: boolean;
  isGroupAdmin: boolean; // false
  certificateUrl?: string;
  lastTaskId?: number;
  lastLessonId?: number;
  lessons?: Lesson[];
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

export interface Notification {
  id: number;
  type: string;
  resourceId: string;
  creationDate: Date;
  isRead: boolean;
  title?: string;
  body?: string;
  imageUrl?: string;
}

export interface NotificationsResults extends Pagination<Notification> {}

export interface MyBadge {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  issueDate?: Date;
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

export enum TaskType {
  Content = 'Content',
  Survey = 'Survey',
  Quiz = 'Quiz',
  Meeting = 'Meeting',
  EditableForm = 'EditableForm',
  Assignment = 'Assignment',
}

export enum SurveyQuestionType {
  RadioBox = 'RadioBox',
  CheckBox = 'CheckBox',
  RadioBoxGrid = 'RadioBoxGrid',
  CheckBoxGrid = 'CheckBoxGrid',
  LinearScale = 'LinearScale',
  DropDown = 'DropDown',
  SingleLineText = 'SingleLineText',
  MultiLineText = 'MultiLineText',
  Date = 'Date',
  DateTime = 'DateTime',
  Time = 'Time',
  Description = 'Description',
}

export interface Content extends Task {
  body: string;
  level?: number;
  traineeBody?: string;
  coachBody?: string;
  isPrivate?: boolean; // OBS.: override BasicModel, force non-optional
  finishDate?: string;
}

export interface Meeting extends Task {
  body: string; // OBS.: override BasicModel, force non-optional
  durationMinutes: number;
  scheduledDate: any;
  roomId?: string;
}

interface FormBase extends Task {
  isAutoCorrectionEnabled: boolean;
  isResponsePrivate: boolean;
  questions: Question[];
  minPassingScore?: number;
  coachValidationRequired?: boolean;
  durationMinutes?: number;
}

export type EditableForm = FormBase;

export interface Quiz extends FormBase {
  minPassingScore: number;
}

export type Survey = FormBase;
export type Form = FormBase;

export interface Question extends BasicModel {
  id: number;
  name: string;
  type: string;
  isRequired: boolean;
  weight: number;
  body: string; // OBS.: override BasicModel, force non-optional
  /**/
  options?: QuestionOption[];
  expectedOptions?: number[];
  selectedOptions?: number[];
  expectedAnswer?: string | number;
  actualAnswer?: string | number;
  minValue?: number;
  maxValue?: number;
  minValueLabel?: string;
  maxValueLabel?: string;
  subQuestions?: SubQuestion[];
  order?: number;
}

export interface QuestionOption {
  id: number;
  body: string;
  order?: number;
  expectedAnswer?: string;
}

export interface SubQuestion {
  id: number;
  body: string;
  expectedOptions?: number[];
  selectedOptions?: number[];
}

export type TaskDetail = Content | Quiz | Survey | Meeting | EditableForm;
