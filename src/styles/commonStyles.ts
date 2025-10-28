import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: 'Avenir-Roman',
    marginRight:5
  },
  headerTitleLeft: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: 'Avenir-Roman',
    marginLeft:5
  },
  backButton: {
    fontSize: 24,
    color: colors.text,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '100',
    color: colors.primary,
    fontFamily: 'Avenir-Roman',
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: colors.primary,
   
    paddingVertical: 12,
    fontSize: 18,
    color: colors.primary,
    fontFamily: 'AGaramondPro-BoldItalic',
    backgroundColor: colors.white,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Avenir-Roman',
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
  linkText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  linkTextSecondary: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.primary,
  },
  dividerText: {
    marginHorizontal: 16,
    color: colors.primary,
    fontSize: 14,
    fontFamily: 'Avenir-Roman',
  },
 
  footerText: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 18,
  },
});
