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
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  title: string;
  subTitle?: string;
  onLeftPress?: () => void;
  leftComponent?: React.ReactElement;
  rightComponent?: React.ReactElement;
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
  titleStyle,
  subTitleStyle,
  subTitleContainerStyle,
  height = 64,
  gradientColors,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const finalGradientColors =
    gradientColors || [colors.gradient1, colors.gradient2];

  /** LEFT COMPONENT COLOR */
  const styledLeftComponent =
    leftComponent &&
    React.cloneElement(leftComponent, {
      style: [
        leftComponent.props.style,
        { color: colors.headerLeftComponent },
      ],
    });

  /** RIGHT COMPONENT COLOR */
  const styledRightComponent =
    rightComponent &&
    React.cloneElement(rightComponent, {
      style: [
        rightComponent.props.style,
        { color: colors.headerRightComponent },
      ],
    });

  return (
    <View
      style={[
        styles.container,
        { shadowColor: colors.shadow, paddingTop: insets.top },
      ]}
    >
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />

      <LinearGradient
        colors={finalGradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.wrapper, { height }]}
      >
        {/* LEFT */}
        <View style={styles.side}>
          {styledLeftComponent ? (
            <Pressable onPress={onLeftPress}>
              {styledLeftComponent}
            </Pressable>
          ) : onLeftPress ? (
            <Pressable onPress={onLeftPress}>
              <Text
                style={[
                  styles.icon,
                  { color: colors.headerLeftComponent },
                ]}
              >
                ←
              </Text>
            </Pressable>
          ) : null}
        </View>

        {/* CENTER */}
        <View style={styles.center}>
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              { color: colors.headerTittle },
              titleStyle,
            ]}
          >
            {title}
          </Text>

          {subTitle ? (
            <View style={[styles.subTitleContainer, subTitleContainerStyle]}>
              <Text
                numberOfLines={1}
                style={[
                  styles.subTitle,
                  { color: colors.headerSubTittle },
                  subTitleStyle,
                ]}
              >
                {subTitle}
              </Text>
            </View>
          ) : null}
        </View>

        {/* RIGHT */}
        <View style={styles.side}>{styledRightComponent}</View>
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
