import {
  Category,
  Content,
  Course,
  CourseResult,
  EditableForm,
  Lesson,
  Meeting,
  Quiz,
  Survey,
  Task,
  TraineeCourse,
  TraineeCourseResult,
} from './model';
import { config } from '~/config/config';
import { get, RequestError } from '../client/restful';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import { stores } from '~/stores';

const PAGE_LIMIT = 500;

export async function getCategories(locale: string): Promise<Category[]> {
  return get<Category[]>(
    `${config.api.learning}/api/categories?language=${locale}&hideEmpty=true`,
  );
}
export async function getLatestCourses(
  limit?: number,
  locale?: string,
): Promise<CourseResult> {
  const resultsPerPage = limit || 20;
  const localeString = locale ? `language=${locale}` : '';
  return get<CourseResult>(
    `${config.api.learning}/api/marketplace/courses?resultsPerPage=${resultsPerPage}&sortBy=newest&${localeString}`,
  );
}
export async function getTraineeCourses(
  page?: number,
  limit: number = PAGE_LIMIT,
): Promise<TraineeCourseResult> {
  return get<TraineeCourseResult>(
    `${config.api.learning}/api/mytraineecourses?resultsPerPage=${limit}&page=${
      page || 0
    }`,
  );
}
export async function getTraineeCourse(
  courseId: number,
): Promise<TraineeCourse> {
  return get<TraineeCourse>(
    `${config.api.learning}/api/trainee/courses/${courseId}`,
  );
}

export async function getAvailableCourses(
  locale: string,
  page: number = 0,
  limit: number = PAGE_LIMIT,
  categoryId?: number,
  search?: string,
): Promise<CourseResult> {
  const localeString = locale ? `language=${locale}` : '';

  let baseUrl = `${config.api.learning}/api/marketplace/courses?resultsPerPage=${limit}&sortBy=newest&${localeString}&page=${page}`;

  if (categoryId) {
    baseUrl += `&categoryId=${categoryId}`;
  }

  if (search) {
    baseUrl += `&search=${encodeURIComponent(search)}`;
  }

  return get<CourseResult>(baseUrl);
}

export async function getParticipantCourse(courseId: number): Promise<Course> {
  return get<Course>(
    `${config.api.learning}/api/marketplace/courses/${courseId}`,
  );
}

export async function getParticipantLessons(
  courseId: number,
): Promise<Lesson[]> {
  return get<Lesson[]>(
    `${config.api.learning}/api/marketplace/courses/${courseId}/lessons`,
  );
}

export async function downloadCertificate(
  certificateId: string,
  fileName: string,
  mime: string,
): Promise<string> {
  const url = `${config.api.learning}/api/certificates/${certificateId}`;
  const { dirs } = RNFetchBlob.fs;

  const DownloadDir = Platform.select({
    ios: dirs.DocumentDir,
    android: dirs.DocumentDir,
  });

  return new Promise((resolve, reject) => {
    RNFetchBlob.config({
      path: DownloadDir + '/' + fileName,
      fileCache: Platform.OS === 'ios',
    })
      .fetch('GET', url)
      .then((res: any) => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.ios.openDocument(res.path());
        } else {
          RNFetchBlob.android.actionViewIntent(res.path(), mime);
        }
        resolve(res.path());
      })
      .catch((e: any) => {
        console.error('e', e);
        reject(e);
      });
  });
}

export async function downloadTranscript(
  fileName: string,
  mime: string,
): Promise<string> {
  const url = `${config.api.learning}/api/Trainee/transcript`;
  const { dirs } = RNFetchBlob.fs;

  const DownloadDir = Platform.select({
    ios: dirs.DocumentDir,
    android: dirs.DocumentDir,
  });

  return new Promise((resolve, reject) => {
    const token = stores.getState().user.token!.access_token;
    RNFetchBlob.config({
      path: DownloadDir + '/' + fileName,
      fileCache: Platform.OS === 'ios',
    })
      .fetch('GET', url, {
        Authorization: `Bearer ${token}`,
      })
      .then((res: any) => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.ios.openDocument(res.path());
        } else {
          RNFetchBlob.android.actionViewIntent(res.path(), mime);
        }
        resolve(res.path());
      })
      .catch((e: any) => {
        console.error('e', e);
        reject(e);
      });
  });
}

export async function getTraineeTaskById(
  task: Task,
): Promise<Content | Quiz | Survey | Meeting | EditableForm> {
  switch (task.type) {
    case 'Content':
      return getTraineeContentTask(task.id);
    case 'Meeting':
      return getTraineeMeetingTask(task.id);
    case 'Survey':
      return getTraineeSurveyTask(task.id);
    case 'Quiz':
      return getTraineeQuizTask(task.id);
    case 'EditableForm':
      return getTraineeEditableFormTask(task.id);
    default:
      return Promise.reject({
        message: 'Unknown Task Type',
        error_message: 'Unknown Task Type',
      } as unknown as RequestError);
  }
}

export async function getTraineeContentTask(
  contentId: number,
): Promise<Content> {
  return get<Content>(
    `${config.api.learning}/api/trainee/content/${contentId}`,
  );
}

export async function getTraineeMeetingTask(
  meetingId: number,
): Promise<Meeting> {
  return get<Meeting>(
    `${config.api.learning}/api/trainee/meeting/${meetingId}`,
  );
}
export async function getTraineeEditableFormTask(
  editableFormId: number,
): Promise<EditableForm> {
  return get<EditableForm>(
    `${config.api.learning}/api/trainee/form/${editableFormId}`,
  );
}

export async function getTraineeQuizTask(quizId: number): Promise<Quiz> {
  return get<Quiz>(`${config.api.learning}/api/trainee/form/${quizId}`);
}

export async function getTraineeSurveyTask(surveyId: number): Promise<Survey> {
  return get<Survey>(`${config.api.learning}/api/trainee/form/${surveyId}`);
}
