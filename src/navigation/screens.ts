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
  Notification = 'Notification',

  InAppBrowser = 'External Content',
  ChangePassword = 'Change Password',

  CourseInformation = 'Course Information', //course drawer page
  CourseDetail = 'Course Detail', //previously Course Information
  CourseExecution = 'Course Execution',

  Setting = 'Settings & Notifications',
}
