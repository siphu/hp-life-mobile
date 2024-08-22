import Images from '~/res/images';
import {development as base} from './config.hplife.endpoint';

export default {
  api: {
    ...base.api,
  },
  remoteLanguage: {
    ...base.remoteLanguage,
  },
  defaultFont: {
    ios: 'Forma DJR Micro',
    android: 'FormaDJRMicro-Regular',
    file: 'FormaDJRMicro-Regular.ttf',
  },
  customWebFont: {
    normal:
      'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&display=swap',
  },
  feature: {
    allowMessage: false,
    allowRedeem: false,
    fullScreenLandscape: true,
    pushNotification: true,
    showNotification: true,
    showBadge: true,
    courseInformation: {
      showLanguage: false,
      showCategory: false,
    },
    courseDisplay: {
      showCategory: true,
    },
    exploreScreen: {
      allowSearch: false,
    },
    myCourseScreen: {
      showCategory: false,
    },
    courseExecution: {
      Portrait: {
        showHeader: true,
        showFooter: false,
      },
      Landscape: {
        showHeader: false,
        showFooter: false,
      },
    },
  },
  externalLinks: [
    // {
    //   title: 'sideMenu.links.about',
    //   url: `${base.api.webUrl}/mobile/about`,
    //   icon: Images.menuAbout,
    // },
    // {
    //   title: 'sideMenu.links.successStories',
    //   url: `${base.api.webUrl}/mobile/successstories`,
    //   icon: Images.menuSuccessStory,
    // },
    // {
    //   title: 'sideMenu.links.partners',
    //   url: `${base.api.webUrl}/mobile/partners`,
    //   icon: Images.menuPartners,
    // },
    // {
    //   title: 'sideMenu.links.news',
    //   url: `${base.api.webUrl}/mobile/news`,
    //   icon: Images.menuNews,
    // },
    // {
    //   title: 'sideMenu.links.help',
    //   url: `${base.api.webUrl}/mobile/help`,
    //   icon: Images.menuHelp,
    // },
    // {
    //   title: 'sideMenu.links.resources',
    //   url: `${base.api.webUrl}/mobile/resources`,
    //   icon: Images.menuResearch,
    // },
  ],
  color: {
    button: {
      primary: '#000',
      secondary: '#f48751',
    },
    primary: '#0096d6',
    webAccBlue: '#165DBA',
    selected: '#EEF6FE',
    text: '#142341',
    background: '#e8e8e8',
    success: '#3cae4c',
    grey: '#E6E6E6',
    darkGrey: '#5A5A5A',
    textSecondary: '#00000099',
    darkBG: '#2F3336',
    grey900: '#212121',
  },
};
