import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
} from 'react-native';
import Icon from './Icon';
import { useTheme } from '../context/ThemeContext';

interface ToastConfig {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastState extends ToastConfig {
  id: string;
  visible: boolean;
}

class ToastManager {
  private static instance: ToastManager;
  private toasts: ToastState[] = [];
  private listeners: ((toasts: ToastState[]) => void)[] = [];

  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  show(config: ToastConfig) {
    const id = Date.now().toString();
    const toast: ToastState = {
      ...config,
      id,
      visible: true,
      duration: config.duration || 3000,
    };

    // Limit to maximum 3 toasts at once
    if (this.toasts.length >= 3) {
      // Remove the oldest toast
      const oldestToast = this.toasts[0];
      this.dismiss(oldestToast.id);
    }

    this.toasts.push(toast);
    this.notifyListeners();

    // Auto dismiss
    setTimeout(() => {
      this.dismiss(id);
    }, toast.duration);
  }

  dismiss(id: string) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.notifyListeners();
  }

  subscribe(listener: (toasts: ToastState[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener([...this.toasts]));
  }
}

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const { colors } = useTheme();

  useEffect(() => {
    const unsubscribe = ToastManager.getInstance().subscribe(setToasts);
    return unsubscribe;
  }, []);

  const getToastIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'close-circle';
      case 'warning':
        return 'alert-circle';
      case 'info':
        return 'information';
      default:
        return 'information';
    }
  };

  const getToastColors = (type: string) => {
    switch (type) {
      case 'success':
        return {
          background: colors.toastBackground,
          text: colors.toastText, // Use main text color for better readability
          border: colors.toastSuccess,
          icon: colors.toastSuccess,
        };
      case 'error':
        return {
          background: colors.toastBackground,
          text: colors.toastText, // Use main text color for better readability
          border: colors.toastError,
          icon: colors.toastError,
        };
      case 'warning':
        return {
          background: colors.toastBackground,
          text: colors.toastText, // Use main text color for better readability
          border: colors.toastWarning,
          icon: colors.toastWarning,
        };
      case 'info':
        return {
          background: colors.toastBackground,
          text: colors.toastText, // Use main text color for better readability
          border: colors.toastInfo,
          icon: colors.toastInfo,
        };
      default:
        return {
          background: colors.toastBackground,
          text: colors.toastText,
          border: colors.toastBorder,
          icon: colors.toastText,
        };
    }
  };

  return (
    <View style={styles.container} pointerEvents="none">
      {toasts.slice().reverse().map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          colors={getToastColors(toast.type)}
          icon={getToastIcon(toast.type)}
        />
      ))}
    </View>
  );
};

interface ToastItemProps {
  toast: ToastState;
  colors: { background: string; text: string; border: string; icon: string };
  icon: string;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, colors, icon }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current; // Changed from -100 to 100 for bottom animation

  useEffect(() => {
    // Animate in from bottom
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate out to bottom after duration
    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 100, // Changed from -100 to 100 for bottom animation
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }, (toast.duration || 3000) - 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Icon
        type="MaterialCommunityIcons"
        name={icon}
        color={colors.icon}
        size={20}
      />
      <Text style={[styles.toastText, { color: colors.text }]}>
        {toast.message}
      </Text>
    </Animated.View>
  );
};

// Enhanced Toast function with type support
const Toast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
  // Always use custom themed toast for consistent appearance
  ToastManager.getInstance().show({
    message,
    type,
    duration: 3000,
  });
};

// Additional helper functions
Toast.success = (message: string) => Toast(message, 'success');
Toast.error = (message: string) => Toast(message, 'error');
Toast.warning = (message: string) => Toast(message, 'warning');
Toast.info = (message: string) => Toast(message, 'info');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50, // Changed from top: 60 to bottom: 120 for bottom positioning
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14, // Slightly increased padding
    borderRadius: 12, // Increased border radius for better appearance
    borderWidth: 1.5, // Slightly thicker border
    marginTop: 8, // Changed from marginBottom to marginTop for bottom stacking
    elevation: 8, // Increased elevation for better shadow
    shadowOffset: { width: 0, height: -2 }, // Negative height for upward shadow
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  toastText: {
    marginLeft: 10, // Slightly increased margin
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    lineHeight: 18, // Better line height for readability
  },
});

export default Toast;
export { ToastContainer };
