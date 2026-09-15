import { Dimensions, PixelRatio, Platform } from 'react-native';

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

const { width, height } = Dimensions.get('window');

export const screenWidth = width;
export const screenHeight = height;

export const shortDimension = Math.min(width, height);
export const longDimension = Math.max(width, height);

export const isSmallDevice = shortDimension < 360;
export const isCompactHeight = longDimension < 700;
export const isTablet = shortDimension >= 600;

const widthRatio = shortDimension / BASE_WIDTH;
const heightRatio = longDimension / BASE_HEIGHT;

export function scale(size: number): number {
  const next = size * Math.min(Math.max(widthRatio, 0.82), isTablet ? 1.24 : 1.1);
  return Math.round(PixelRatio.roundToNearestPixel(next));
}

export function verticalScale(size: number): number {
  const next = size * Math.min(Math.max(heightRatio, 0.8), 1.12);
  return Math.round(PixelRatio.roundToNearestPixel(next));
}

export function fontSize(size: number): number {
  const factor = Math.min(Math.max(widthRatio, 0.86), isTablet ? 1.18 : 1.06);
  const next = size * factor;
  return Math.round(PixelRatio.roundToNearestPixel(next));
}

export function spacing(size: number): number {
  return scale(size);
}

export const hitSlop = { top: 10, bottom: 10, left: 10, right: 10 };

export const shadow = (elevation: number) =>
  Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOpacity: 0.32,
      shadowRadius: elevation * 1.6,
      shadowOffset: { width: 0, height: elevation * 0.6 },
    },
    android: { elevation },
    default: {},
  }) as object;
