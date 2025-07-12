import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6B35',
    secondary: '#F7931E',
    accent: '#FFD23F',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#2C2C2C',
    placeholder: '#8E8E93',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    onSurface: '#2C2C2C',
    notification: '#FF3B30',
    card: '#FFFFFF',
    border: '#E5E5E5',
    // Custom colors for temple theme
    saffron: '#FF9933',
    deepSaffron: '#FF6600',
    gold: '#FFD700',
    temple: '#8B4513',
    divine: '#9932CC',
    lightOrange: '#FFF8DC',
    darkOrange: '#FF8C00',
    cream: '#FFFDD0',
    maroon: '#800000',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'System',
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as const,
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300' as const,
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100' as const,
    },
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  round: 50,
};

export const shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.65,
    elevation: 8,
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.27,
    elevation: 12,
  },
};