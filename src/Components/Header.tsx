import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

interface HeaderProps {
  title: string;
  subTitle?: string;
  onLeftPress?: () => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;

  titleColor?: string;
  subTitleColor?: string;

  titleStyle?: TextStyle;
  subTitleStyle?: TextStyle;
  subTitleContainerStyle?: ViewStyle;

  height?: number;
  gradientColors?: string[];
}

const Header = ({
  title,
  subTitle,
  onLeftPress,
  leftComponent,
  rightComponent,
  titleColor = '#FFFFFF',
  subTitleColor = '#FFE6CC',
  titleStyle,
  subTitleStyle,
  subTitleContainerStyle,
  height = 64,
  gradientColors = ['#FF8A00', '#FF6A00'],
}: HeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />

      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.wrapper, { height }]}
      >
        <View style={styles.side}>
          {leftComponent ? (
            leftComponent
          ) : onLeftPress ? (
            <Pressable onPress={onLeftPress}>
              <Text style={styles.icon}>←</Text>
            </Pressable>
          ) : null}
        </View>

        <View style={styles.center}>
          <Text
            numberOfLines={1}
            style={[styles.title, { color: titleColor }, titleStyle]}
          >
            {title}
          </Text>

          {subTitle ? (
            <View style={[styles.subTitleContainer, subTitleContainerStyle]}>
              <Text
                numberOfLines={1}
                style={[
                  styles.subTitle,
                  { color: subTitleColor },
                  subTitleStyle,
                ]}
              >
                {subTitle}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.side}>{rightComponent}</View>
      </LinearGradient>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1000,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  side: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  subTitleContainer: {
    marginTop: 4,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '400',
    opacity: 0.9,
  },
});
