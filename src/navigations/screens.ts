export type AppScreens = AuthenticatedScreens | UnAuthenticatedScreens;

export enum UnAuthenticatedScreens {
  Login = 'Login',
  Language = 'Language',
}

export enum AuthenticatedScreens {
  HomeDrawer = 'HomeDrawer',
  Home = 'Home',
  MyProfileStack = 'My Profile Stack',
  MyPrescriptions = 'My Prescriptions',
  PrescriptionDetail = 'Prescription Detail',
  TransferPrescriptionStack = 'Transfer Prescription Stack',
  Setting = 'Settings & Notifications',
  Contact = 'Contact Us',
  About = 'About',
  Onboarding = 'Onboard',
  ChatWithPrescriber = 'Chat',
}
