import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/Features/authState';

const Settings = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <Text>Settings</Text>
      <TouchableOpacity onPress={() => dispatch(logout())}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
