import {MD3DarkTheme, MD3Theme} from 'react-native-paper';
import {baseTheme} from './base';

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  ...baseTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#59d5f8',
    onPrimary: '#003642',
    primaryContainer: '#004e5e',
    onPrimaryContainer: '#b2ebff',
    secondary: '#b3cad3',
    onSecondary: '#1d343b',
    secondaryContainer: '#344a52',
    onSecondaryContainer: '#cee7f0',
    tertiary: '#c1c4eb',
    onTertiary: '#2a2e4d',
    tertiaryContainer: '#414465',
    onTertiaryContainer: '#dfe0ff',
    error: '#ffb4ab',
    errorContainer: '#93000a',
    onError: '#690005',
    onErrorContainer: '#ffdad6',
    background: '#191c1d',
    onBackground: '#e1e3e4',
    outline: '#899296',
    inverseOnSurface: '#191c1d',
    inverseSurface: '#e1e3e4',
    inversePrimary: '#00677d',
    shadow: '#000000',
    outlineVariant: '#40484b',
    scrim: '#000000',
    surface: '#111415',
    onSurface: '#c5c7c8',
    surfaceVariant: '#40484b',
    onSurfaceVariant: '#bfc8cc',
    elevation: {
      level0: 'transparent',
      level1: '#000000',
      level2: '#181818', // Menu background
      level3: '#303030', // Search bar background
      level4: '#000000',
      level5: '#000000',
    },
  },
};
