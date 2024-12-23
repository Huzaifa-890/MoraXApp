import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useUser} from '../../context/UserContext';

const Settings = () => {
  const {setIsLogin} = useUser();
  return (
    <View>
      <Text>Settings</Text>
      <TouchableOpacity onPress={() => setIsLogin(false)}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
