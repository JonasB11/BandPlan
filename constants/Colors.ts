/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    // Neue Farben für die Band-App
    primary: tintColorLight,
    secondary: '#34495e',
    accent: '#e74c3c',
    success: '#2ecc71',
    warning: '#f1c40f',
    error: '#e74c3c',
    cardBackground: '#f5f6fa',
    border: '#dcdde1',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    // Neue Farben für die Band-App
    primary: '#3498db',
    secondary: '#95a5a6',
    accent: '#e74c3c',
    success: '#27ae60',
    warning: '#f39c12',
    error: '#c0392b',
    cardBackground: '#1e272e',
    border: '#2f3640',
  },
};
