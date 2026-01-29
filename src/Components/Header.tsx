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
  onRightPress?: () => void;
  rightComponentContainerStyle?: ViewStyle;
  avatarContainerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subTitleStyle?: TextStyle;
  subTitleContainerStyle?: ViewStyle;
  height?: number;
  showUserAvatar?: boolean;
  onAvatarPress?: () => void;
}

const Header = ({
  title,
  subTitle,
  onLeftPress,
  leftComponent,
  rightComponent,
  onRightPress,
  rightComponentContainerStyle,
  avatarContainerStyle,
  titleStyle,
  subTitleStyle,
  subTitleContainerStyle,
  height = 100, // ✅ HEADER HEIGHT
  showUserAvatar = false,
  onAvatarPress,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { currentUser } = useSelector((state: RootState) => state.User);

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
          paddingTop: insets.top, // safe area only
        },
      ]}
    >
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      <View style={[styles.wrapper, { height }]}>
        {/* LEFT */}
        <View style={styles.side}>
          {styledLeftComponent ? (
            <Pressable style={styles.touchArea} onPress={onLeftPress}>
              {styledLeftComponent}
            </Pressable>
          ) : onLeftPress ? (
            <Pressable style={styles.touchArea} onPress={onLeftPress}>
              <Text
                style={[styles.icon, { color: colors.headerLeftComponent }]}
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
            <View
              style={[
                styles.subTitleContainer,
                subTitleContainerStyle,
              ]}
            >
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
              style={[styles.avatarContainer, avatarContainerStyle]}
            >
              {getProfileImageUri() ? (
                <Image
                  source={{ uri: getProfileImageUri() }}
                  style={styles.avatar}
                />
              ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                  <Icon
                    type="Ionicons"
                    name="person"
                    size={22}
                    color="#888"
                  />
                </View>
              )}
            </Pressable>
          ) : styledRightComponent ? (
            <Pressable
              onPress={onRightPress}
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
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',     // vertical center
    justifyContent: 'center', // overall centering
    paddingHorizontal: 16,
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
    fontSize: 20,
    fontWeight: '600',
  },
  subTitleContainer: {
    marginTop: 6,
  },
  subTitle: {
    fontSize: 12,
    opacity: 0.7,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEE',
  },
  rightComponentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 20,
  },
});
