import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  ViewStyle,
  TextStyle,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
import { useTheme } from '../context/ThemeContext';
import Icon from './Icon';

interface HeaderProps {
  title: string;
  subTitle?: string;
  onLeftPress?: () => void;
  leftComponent?: React.ReactElement;
  rightComponent?: React.ReactElement;
  onRightPress?: () => void; // ✅ NEW
  rightComponentContainerStyle?: ViewStyle;
  avatarContainerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subTitleStyle?: TextStyle;
  subTitleContainerStyle?: ViewStyle;
  height?: number;
  gradientColors?: string[];
  showUserAvatar?: boolean;
  onAvatarPress?: () => void;
}

const Header = ({
  title,
  subTitle,
  onLeftPress,
  leftComponent,
  rightComponent,
  onRightPress, // ✅ NEW
  rightComponentContainerStyle,
  avatarContainerStyle,
  titleStyle,
  subTitleStyle,
  subTitleContainerStyle,
  height = 64,
  gradientColors,
  showUserAvatar = false,
  onAvatarPress,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { currentUser } = useSelector((state: RootState) => state.User);

  const finalGradientColors = gradientColors || [
    colors.gradient1,
    colors.gradient2,
  ];

  const getProfileImageUri = (): string | undefined =>
    currentUser?.profileImage
      ? `file://${currentUser.profileImage}`
      : undefined;

  const styledLeftComponent =
    leftComponent &&
    React.cloneElement(leftComponent, {
      ...(leftComponent.props as any),
      style: [
        (leftComponent.props as any)?.style,
        { color: colors.headerLeftComponent },
      ],
    });

  const styledRightComponent =
    rightComponent &&
    React.cloneElement(rightComponent, {
      ...(rightComponent.props as any),
      style: [
        (rightComponent.props as any)?.style,
        { color: colors.headerRightComponent },
      ],
    });

  return (
    <View
      style={[
        styles.container,
        {
          shadowColor: colors.shadow,
          paddingTop: insets.top,
        },
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
            <Pressable style={styles.touchArea} onPress={onLeftPress}>
              {styledLeftComponent}
            </Pressable>
          ) : onLeftPress ? (
            <Pressable style={styles.touchArea} onPress={onLeftPress}>
              <Text style={[styles.icon, { color: colors.headerLeftComponent }]}>
                ←
              </Text>
            </Pressable>
          ) : null}
        </View>

        {/* CENTER */}
        <View style={styles.center}>
          <Text
            numberOfLines={1}
            style={[styles.title, { color: colors.headerTittle }, titleStyle]}
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
        <View style={styles.side}>
          {showUserAvatar ? (
            <Pressable
              onPress={onAvatarPress}
              disabled={!onAvatarPress}
              style={[
                styles.avatarContainer,
                avatarContainerStyle,
              ]}
            >
              {getProfileImageUri() ? (
                <Image source={{ uri: getProfileImageUri() }} style={styles.avatar} />
              ) : (
                <View
                  style={[
                    styles.avatar,
                    { backgroundColor: colors.headerAvatarPlaceholder || '#E0E0E0' },
                  ]}
                >
                  <Icon
                    type="Ionicons"
                    name="person"
                    size={22}
                    color={colors.headerAvatarIcon || '#999'}
                  />
                </View>
              )}
            </Pressable>
          ) : styledRightComponent ? (
            <Pressable
              onPress={onRightPress}               // ✅ HANDLER
              disabled={!onRightPress}
              style={[
                styles.rightComponentWrapper,
                rightComponentContainerStyle,
              ]}
            >
              {styledRightComponent}
            </Pressable>
          ) : null}
        </View>
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
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchArea: {
    padding: 8,
    borderRadius: 20,
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

  /* AVATAR BASE */
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    alignItems:"center",
    justifyContent:"center",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },

  /* RIGHT COMPONENT BASE */
  rightComponentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 20,
  },
});
