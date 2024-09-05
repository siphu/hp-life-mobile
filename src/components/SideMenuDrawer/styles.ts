import {StyleSheet} from 'react-native';
import {config} from '~/config/config';
import {GlobalStyles} from '~/config/styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: config.color.neutral[50],
    flexGrow: 1,
  },
  topSafeArea: {
    backgroundColor: GlobalStyles.header.backgroundColor,
    paddingTop: 0,
  },
  topHeader: {
    alignItems: 'center',
    backgroundColor: GlobalStyles.header.backgroundColor,
    flexDirection: 'row',
    height: GlobalStyles.header.height,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  hpLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexGrow: 1,
  },
  profileContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomColor: config.color.neutral[300],
    borderBottomWidth: 1,
  },
  profileBox: {
    paddingVertical: 16,
    paddingLeft: 16,
    borderRadius: 8,
    backgroundColor: config.color.neutral[300],
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  profileArrowContainer: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  userInitialContainer: {
    alignItems: 'center',
    backgroundColor: '#0171AD',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    marginRight: 16,
    width: 48,
  },
  userInitial: {
    color: config.color.neutral[50],
    fontSize: 24,
    fontWeight: '500',
  },
  userName: {
    alignItems: 'center',
    color: config.color.neutral[900],
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 24,
    justifyContent: 'center',
  },
  userEmail: {
    alignItems: 'center',
    color: 'rgba(0, 0, 0, 0.6)',
    flexShrink: 1,
    fontSize: 12,
    lineHeight: 17.16,
    justifyContent: 'center',
  },
  greyRow: {
    alignItems: 'center',
    backgroundColor: config.color.misc.border,
    borderBottomColor: config.color.misc.borderLight,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  whiteRow: {
    alignItems: 'center',
    backgroundColor: config.color.neutral[50],
    borderBottomColor: config.color.misc.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  selectedRow: {
    backgroundColor: config.color.button.secondary,
  },
  linkIcon: {
    marginRight: 10,
  },
  rowText: {
    fontSize: 16,
  },
  rowTextSelected: {},
  rowTextDisabled: {
    color: config.color.neutral[400],
  },
  logoutContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 20,
  },
  hpFoundationContainer: {
    alignItems: 'center',
    backgroundColor: config.color.neutral[700],
    paddingVertical: 20,
  },
  hpFoundationText: {
    color: config.color.neutral[50],
    marginTop: 5,
  },
  bottomSafeArea: {
    backgroundColor: config.color.neutral[700],
  },
});
