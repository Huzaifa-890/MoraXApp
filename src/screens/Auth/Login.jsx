import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import colors from '../../assessts/Colors/Colors.js'; // Ensure the path and folder name are correct

const Login = () => {
  return (
    <>
    <ImageBackground
      source={require('../../assessts/Morabg.png')} // Ensure the image path is correct
      style={styles.container}
      resizeMode="cover" // Ensures the image covers the entire screen
    >
      <View>
        <Text style={styles.logintext}>Login Screen</Text>
      </View>
    </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PrimaryColor,
  },
  logintext: {
    color: 'white',
    fontSize: 24, // Added a font size for better readability
    fontWeight: 'bold', // Bold text for emphasis
    textAlign: 'center', // Center-align the text
  },
});

export default Login;
