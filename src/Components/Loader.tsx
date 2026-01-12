import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';

interface LoaderProps {
  visible?: boolean;
  size?: 'small' | 'large';
  color?: string;
  overlayColor?: string;
}

const Loader = ({
  visible = true,
  size = 'large',
  color = '#FF7A00',
  overlayColor = 'rgba(0,0,0,0.3)',
}: LoaderProps) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  if (!visible) return null;

  return (
    <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <ActivityIndicator size={size} color={color} />
      </Animated.View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
