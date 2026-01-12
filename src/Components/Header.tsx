import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  subTitle?: string;                 // ✅ NEW
  onLeftPress?: () => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  titleColor?: string;
  subTitleColor?: string;            // ✅ NEW
}

const Header = ({
  title,
  subTitle,
  onLeftPress,
  leftComponent,
  rightComponent,
  titleColor = '#000',
  subTitleColor = '#666',
}: HeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
        translucent
      />

      <View style={styles.wrapper}>
        {/* LEFT */}
        <View style={styles.side}>
          {leftComponent ? (
            leftComponent
          ) : onLeftPress ? (
            <Pressable onPress={onLeftPress}>
              <Text style={styles.icon}>←</Text>
            </Pressable>
          ) : null}
        </View>

        {/* CENTER */}
        <View style={styles.center}>
          <Text
            numberOfLines={1}
            style={[styles.title, { color: titleColor }]}
          >
            {title}
          </Text>

          {subTitle ? (
            <Text
              numberOfLines={1}
              style={[styles.subTitle, { color: subTitleColor }]}
            >
              {subTitle}
            </Text>
          ) : null}
        </View>

        {/* RIGHT */}
        <View style={styles.side}>
          {rightComponent}
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  wrapper: {
    height: 64,                // ⬆ slightly taller for subtitle
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
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
    color: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '400',
  },
});
