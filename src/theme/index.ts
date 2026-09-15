export { colors, gradients, ballColors } from './colors';
export { typography } from './typography';
export {
  scale,
  verticalScale,
  fontSize,
  spacing,
  shadow,
  hitSlop,
  screenWidth,
  screenHeight,
  shortDimension,
  longDimension,
  isSmallDevice,
  isCompactHeight,
  isTablet,
} from './responsive';

export const radius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 26,
  pill: 999,
} as const;

export const layout = {
  gutter: 18,
  cardPadding: 16,
  sectionGap: 22,
  tabBarHeight: 62,
} as const;
