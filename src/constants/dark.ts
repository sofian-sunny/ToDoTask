import {
  ITheme,
  ThemeColors,
  ThemeGradients,
  ThemeSizes,
  ThemeSpacing,
} from './types';

import {THEME as commonTheme} from './theme';
import {moderateScale, scale, verticalScale} from './scaling';

export const COLORS: ThemeColors = {
  // default text color
  text: '#FFFFFF',

  // base colors
  /** UI color for #primary */
  primary: '#BA83DE',
  /** UI color for #secondary */
  secondary: '#627594', // '#8392AB',
  /** UI color for #tertiary */
  tertiary: '#E8AE4C',

  // non-colors
  black: '#252F40',
  white: '#FFFFFF',

  dark: '#252F40',
  light: '#E9ECEF',

  // gray variations
  /** UI color for #gray */
  gray: '#A7A8AE',

  // colors variations
  /** UI color for #danger */
  danger: '#EA0606',
  /** UI color for #warning */
  warning: '#FFC107',
  /** UI color for #success */
  success: '#82D616',
  /** UI color for #info */
  info: '#17C1E8',

  /** UI colors for navigation & card */
  card: '#181818',
  background: '#020206',

  /** UI color for shadowColor */
  shadow: '#627594',
  overlay: 'rgba(0,0,0,0.3)',

  /** UI color for input borderColor on focus */
  focus: '#E293D3',
  input: '#FFFFFF',

  /** UI color for switch checked/active color */
  switchOn: '#CB0C9F',
  switchOff: '#181A1F',

  /** UI color for checkbox icon checked/active color */
  checkbox: ['#BA83DE', '#BA83DE'],
  checkboxIcon: '#FFFFFF',

  /** social colors */
  facebook: '#3B5998',
  twitter: '#55ACEE',
  dribbble: '#EA4C89',

  /** icon tint color */
  icon: '#FFFFFF',

  /** blur tint color */
  blurTint: 'dark',

  /** product link color */
  link: '#FFFFFF',
  spaceAngel: '#3A416F',
  transparent: 'transparent',
};

export const GRADIENTS: ThemeGradients = {
  primary: ['#DE83B0', '#C59ADF'],
  secondary: ['#A8B8D8', '#627594'],
  info: ['#21D4FD', '#2152FF'],
  success: ['#98EC2D', '#17AD37'],
  warning: ['#FBCF33', '#F53939'],
  danger: ['#FF667C', '#EA0606'],

  light: ['#EBEFF4', '#CED4DA'],
  dark: ['#3A416F', '#141727'],
  gold_white: ['#FACBBA', '#FFFFFF'],
  lightblue_white: ['#D7F0FF', '#FFFFFF'],
  primary_white: ['#FAD9FF', '#FFFFFF'],

  white: [String(COLORS.white), '#EBEFF4'],
  black: [String(COLORS.black), '#141727'],

  divider: ['rgba(255,255,255,0)', 'rgba(102, 116, 142, 0.6)'],
  menu: [
    'rgba(255, 255, 255, 0.0)',
    'rgba(255, 255, 255, 0.5)',
    'rgba(255, 255, 255, 0.0)',
  ],
};

export const SIZES: ThemeSizes = {
  // global sizes
  base: 8,
  text: 10,
  radius: moderateScale(4),
  padding: moderateScale(20),

  // font sizes
  h1: moderateScale(25),
  h2: moderateScale(25),
  h3: moderateScale(22),
  h4: moderateScale(20),
  h5: moderateScale(18),
  h6: moderateScale(16),
  p: moderateScale(14),

  // button sizes
  buttonBorder: 1,
  buttonRadius: moderateScale(8),
  socialSize: 64,
  socialRadius: moderateScale(16),
  socialIconSize: moderateScale(26),

  // button shadow
  shadowOffsetWidth: 0,
  shadowOffsetHeight: verticalScale(7),
  shadowOpacity: 0.07,
  shadowRadius: 4,
  elevation: 2,

  // input sizes
  inputHeight: verticalScale(46),
  inputBorder: 1,
  inputRadius: moderateScale(8),
  inputPadding: moderateScale(12),

  // card sizes
  cardRadius: moderateScale(8),
  cardPadding: moderateScale(16),

  // image sizes
  imageRadius: moderateScale(14),
  avatarSize: moderateScale(45),
  avatarRadius: moderateScale(8),

  // switch sizes
  switchWidth: scale(50),
  switchHeight: verticalScale(24),
  switchThumb: moderateScale(20),

  // checkbox sizes
  checkboxWidth: moderateScale(26),
  checkboxHeight: moderateScale(26),
  checkboxRadius: moderateScale(13),
  checkboxIconWidth: scale(11),
  checkboxIconHeight: verticalScale(8),

  // product link size
  linkSize: 12,

  /** font size multiplier: for maxFontSizeMultiplier prop */
  multiplier: 2,
};

export const SPACING: ThemeSpacing = {
  /** xs: 4px */
  xs: SIZES.base * 0.5,
  /** s: 8px */
  s: SIZES.base * 1,
  /** sm: 16px */
  sm: SIZES.base * 2,
  /** m: 24px */
  m: SIZES.base * 3,
  /** md: 32px */
  md: SIZES.base * 4,
  /** l: 40px */
  l: SIZES.base * 5,
  /** xl: 48px */
  xl: SIZES.base * 6,
  /** xxl: 56px */
  xxl: SIZES.base * 7,
};

export const THEME: ITheme = {
  ...commonTheme,
  colors: COLORS,
  gradients: GRADIENTS,
  sizes: {...SIZES, ...commonTheme.sizes, ...SPACING},
};
