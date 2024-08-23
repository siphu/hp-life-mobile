export type AppScreens = AuthenticatedScreens | UnAuthenticatedScreens;

export enum UnAuthenticatedScreens {
  Login = 'Login',
  Language = 'Language',
}

export enum AuthenticatedScreens {
  HomeDrawer = 'HomeDrawer',
  HomeTabs = 'HomeTabs',

  Home = 'Home',
  Dashboard = 'My Dashboard',
  Explore = 'Explore',

  Profile = 'Profile',

  InAppBrowser = 'External Content',

  CourseInformation = 'Course Information',
  CourseExecution = 'Course Execution',

  Setting = 'Settings & Notifications',
}
