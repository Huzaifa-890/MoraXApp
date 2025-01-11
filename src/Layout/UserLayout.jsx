import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import colors from '../assessts/Colors/Colors';
import {windowWidth} from '../Utils/Config/Dimension/Dimention';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const UserLayout = ({children, isBack = false}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <View style={styles.HeaderContainer}>
        <View style={styles.ProfileContainer}>
          <Image
            source={require('../assessts/profile.png')}
            style={styles.ProfileImg}
          />
          <View style={{gap: 2}}>
            <Text style={styles.Name}>Fayzan Ahmed</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
              <Text style={styles.Text2}>CHARMAR</Text>
              {isBack && (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="chevron-back" color="white" size={20} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.SettingContainer}
          onPress={() => navigation.navigate('Settings')}>
          <Feather name="settings" color="white" size={20} />
          <Text style={styles.Name}>Settings</Text>
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={require('../assessts/bg.png')}
        style={styles.MainContainer}>
        {children}
      </ImageBackground>
    </View>
  );
};

export default UserLayout;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.PrimaryColor,
  },
  HeaderContainer: {
    width: windowWidth - 10,
    marginHorizontal: 5,
    backgroundColor: '#504B4B87',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ProfileContainer: {
    gap: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  ProfileImg: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  Name: {
    color: colors.white,
    fontWeight: 700,
    fontSize: 17,
  },
  Text2: {
    color: colors.white,
  },
  SettingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  MainContainer: {
    width: windowWidth,
    flex: 1,
    paddingTop: 100,
  },
});
