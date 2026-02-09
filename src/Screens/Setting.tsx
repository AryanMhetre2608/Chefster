import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const Setting = () => {
  const navigation = useNavigation<any>();
  const { isDarkMode, toggleTheme, colors } = useTheme();

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Header
        title="Settings"
        titleStyle={{fontWeight: 'bold', fontSize: 24 }}
      />
      <View style={styles.overlappingContainer}>
        <View
          style={{
            
            width: '90%',
            height: 20,
            marginVertical: 20,
            gap: 15,
          }}
        >
        
          

          {/* Contact Us Button */}
          <Pressable
            style={[styles.buttonContainer, { backgroundColor: colors.surface }]}
           
            onPress={() => navigation.navigate('Contact_Us', { from: 'Settings' })}
          >
            <View style={styles.iconContainer}>
              <Icon
                type="Feather"
                name="phone"
                color={colors.textSecondary}
                size={31}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.buttonText, { color: colors.textSecondary }]}>
                Contact Us
              </Text>
            </View>
          </Pressable>
          
          {/* Privacy Policy Button */}
          <Pressable
            style={[styles.buttonContainer, { backgroundColor: colors.surface }]}
           
            onPress={() => navigation.navigate('PrivacyPolicy', { from: 'Settings' })}
            
          >
            <View style={styles.iconContainer}>
              <Icon
                type="Feather"
                name="shield"
                color={colors.textSecondary}
                size={31}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.buttonText, { color: colors.textSecondary }]}>
                Privacy Policy
              </Text>
            </View>
          </Pressable>

          {/* Change Password Button */}
          <Pressable
            style={[styles.buttonContainer, { backgroundColor: colors.surface }]}
            onPress={() => navigation.navigate('ChangePassword', { from: 'Settings' })}
          >
            <View style={styles.iconContainer}>
              <Icon
                type="FontAwesome"
                name="lock"
                color={colors.textSecondary}
                size={31}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.buttonText, { color: colors.textSecondary }]}>
                Change Password
              </Text>
            </View>
          </Pressable>

          {/* Dark Mode Toggle Button */}
          <Pressable
            style={[
              styles.buttonContainer,
              {
                backgroundColor: isDarkMode ? colors.surface : colors.surface,
                borderWidth: isDarkMode ? 1 : 0,
                borderColor: isDarkMode ? colors.border : 'transparent',
              },
            ]}
            onPress={toggleTheme}
          >
            <View style={styles.iconContainer}>
              <Icon
                type={isDarkMode ? "Ionicons" : "Entypo"}
                name={isDarkMode ? "moon-sharp" : "light-up"}
                color={isDarkMode ? colors.gradient1 : colors.textSecondary}
                size={31}
              />
            </View>
            <View style={styles.textContainer}>
              <Text 
                style={[
                  styles.buttonText, 
                  { 
                    color: isDarkMode ? colors.gradient1 : colors.textSecondary,
                    fontWeight: isDarkMode ? 'bold' : 'bold'
                  }
                ]}
              >
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </View>
          </Pressable>

          {/* Logout Button */}
          <Pressable
            style={[styles.buttonContainer, { backgroundColor: colors.surface }]}
            onPress={() => navigation.navigate('Logout', { from: 'Settings' })}
          >
            <View style={styles.iconContainer}>
              <Icon
                type="Feather"
                name="log-out"
                color={colors.textSecondary}
                size={31}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.buttonText, { color: colors.textSecondary }]}>
                Logout
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Setting;

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
   
  },
  overlappingContainer: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.background,
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
    zIndex: 10,
    elevation: 25,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 1.0,
    shadowRadius: 8,
  },
  buttonContainer: {
    width: '100%',
    height: 65,
    borderRadius: 20,
    elevation: 10,
    flexDirection: 'row',
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '18%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '82%',
    height: '100%',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
