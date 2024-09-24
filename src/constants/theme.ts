import {Dimensions, Platform} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  ICommonTheme,
  ThemeAssets,
  ThemeFonts,
  ThemeIcons,
  ThemeLineHeights,
  ThemeWeights,
} from './types';

const {width, height} = Dimensions.get('window');

// Naming source: https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Common_weight_name_mapping
export const WEIGHTS: ThemeWeights = {
  text: 'normal',
  h1: Platform.OS === 'ios' ? '600' : 'normal',
  h2: Platform.OS === 'ios' ? '600' : 'normal',
  h3: Platform.OS === 'ios' ? '600' : 'normal',
  h4: Platform.OS === 'ios' ? '600' : 'normal',
  h5: Platform.OS === 'ios' ? '600' : 'normal',
  h6: Platform.OS === 'ios' ? '600' : 'normal',
  p: 'normal',

  thin: Platform.OS === 'ios' ? '100' : 'normal',
  extralight: Platform.OS === 'ios' ? '200' : 'normal',
  light: Platform.OS === 'ios' ? '300' : 'normal',
  normal: Platform.OS === 'ios' ? '400' : 'normal',
  medium: Platform.OS === 'ios' ? '500' : 'normal',
  semibold: Platform.OS === 'ios' ? '600' : 'normal',
  bold: Platform.OS === 'ios' ? '700' : 'normal',
  extrabold: Platform.OS === 'ios' ? '800' : 'normal',
  black: Platform.OS === 'ios' ? '900' : 'normal',
};

export const ICONS: ThemeIcons = {
  warning: require('../assets/icons/warning.png'),
  search: require('../assets/icons/search.png'),
  check: require('../assets/icons/check.png'),
  profile: require('../assets/icons/profile.png'),
  edit: require('../assets/icons/edit.png'),
  calendar: require('../assets/icons/calendar.png'),
  plus: require('../assets/icons/plus.png'),
  back: require('../assets/icons/back.png'),
  left_arrow: require('../assets/icons/arrow_left.png'),
  right_arrow: require('../assets/icons/arrow_right.png'),
  time_icon: require('../assets/icons/time.png'),
};

export const ASSETS: ThemeAssets = {
  // fonts
  RobotoBold: require('../assets/fonts/Roboto-Bold.ttf'),
  RobotoRegular: require('../assets/fonts/Roboto-Regular.ttf'),
  RobotoMedium: require('../assets/fonts/Roboto-Medium.ttf'),
  RobotoBoldItalic: require('../assets/fonts/Roboto-BoldItalic.ttf'),
  RobotoItalic: require('../assets/fonts/Roboto-Italic.ttf'),
  RobotoBlack: require('../assets/fonts/Roboto-Black.ttf'),
  RobotoBlackItalic: require('../assets/fonts/Roboto-BlackItalic.ttf'),
  RobotoLight: require('../assets/fonts/Roboto-Light.ttf'),
  RobotoMediumItalic: require('../assets/fonts/Roboto-MediumItalic.ttf'),
  RobotoThin: require('../assets/fonts/Roboto-Thin.ttf'),
  RobotoThinItalic: require('../assets/fonts/Roboto-ThinItalic.ttf'),
};

export const FONTS: ThemeFonts = {
  // based on font size
  h1: 'Roboto-Medium',
  h2: 'Roboto-Regular',
  h3: 'Roboto-Regular',
  h4: 'Roboto-Regular',
  h5: 'Roboto-Regular',
  h6: 'Roboto-Regular',
  p: 'Roboto-Regular',
  text: 'Roboto-Regular',

  // based on fontWeight
  thin: 'Roboto-Light',
  extralight: 'Roboto-Light',
  light: 'Roboto-Light',
  normal: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  semibold: 'Roboto-Medium',
  bold: 'Roboto-Bold',
  extrabold: 'Roboto-Bold',
  black: 'Roboto-Bold',
};

export const LINE_HEIGHTS: ThemeLineHeights = {
  // font lineHeight
  text: 10,
  h1: 30,
  h2: 25,
  h3: 22,
  h4: 20,
  h5: 18,
  h6: 16,
  p: 14,
};

export const THEME: ICommonTheme = {
  SimpleLineIcons,
  Ionicons,
  Octicons,
  Feather,
  MaterialCommunityIcons,
  icons: ICONS,
  assets: {...ICONS, ...ASSETS},
  fonts: FONTS,
  weights: WEIGHTS,
  lines: LINE_HEIGHTS,
  sizes: {width, height},
};

export {
  width,
  SimpleLineIcons,
  Ionicons,
  Octicons,
  Feather,
  MaterialCommunityIcons,
};
