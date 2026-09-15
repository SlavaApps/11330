import { Platform, TextStyle } from 'react-native';
import { fontSize } from './responsive';
import { colors } from './colors';

const family = Platform.select({
  ios: { regular: 'System', medium: 'System', bold: 'System' },
  default: {
    regular: 'sans-serif',
    medium: 'sans-serif-medium',
    bold: 'sans-serif',
  },
})!;

export const typography = {
  display: {
    fontFamily: family.bold,
    fontSize: fontSize(30),
    lineHeight: fontSize(37),
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  } as TextStyle,
  title: {
    fontFamily: family.bold,
    fontSize: fontSize(25),
    lineHeight: fontSize(31),
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  } as TextStyle,
  heading: {
    fontFamily: family.bold,
    fontSize: fontSize(19),
    lineHeight: fontSize(25),
    fontWeight: '700',
    color: colors.textPrimary,
  } as TextStyle,
  subheading: {
    fontFamily: family.medium,
    fontSize: fontSize(16),
    lineHeight: fontSize(22),
    fontWeight: '600',
    color: colors.textPrimary,
  } as TextStyle,
  body: {
    fontFamily: family.regular,
    fontSize: fontSize(15),
    lineHeight: fontSize(22),
    fontWeight: '400',
    color: colors.textSecondary,
  } as TextStyle,
  bodyStrong: {
    fontFamily: family.medium,
    fontSize: fontSize(15),
    lineHeight: fontSize(21),
    fontWeight: '600',
    color: colors.textPrimary,
  } as TextStyle,
  small: {
    fontFamily: family.regular,
    fontSize: fontSize(13),
    lineHeight: fontSize(18),
    fontWeight: '400',
    color: colors.textMuted,
  } as TextStyle,
  smallStrong: {
    fontFamily: family.medium,
    fontSize: fontSize(13),
    lineHeight: fontSize(18),
    fontWeight: '600',
    color: colors.textPrimary,
  } as TextStyle,
  tiny: {
    fontFamily: family.regular,
    fontSize: fontSize(11),
    lineHeight: fontSize(15),
    fontWeight: '500',
    color: colors.textMuted,
  } as TextStyle,
  label: {
    fontFamily: family.medium,
    fontSize: fontSize(11),
    lineHeight: fontSize(14),
    fontWeight: '700',
    letterSpacing: 1.1,
    color: colors.textMuted,
  } as TextStyle,
  metric: {
    fontFamily: family.bold,
    fontSize: fontSize(44),
    lineHeight: fontSize(50),
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -1,
  } as TextStyle,
  button: {
    fontFamily: family.medium,
    fontSize: fontSize(16),
    lineHeight: fontSize(21),
    fontWeight: '600',
    color: colors.textPrimary,
  } as TextStyle,
};
