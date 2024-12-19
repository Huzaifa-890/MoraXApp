import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Animated,
} from 'react-native';
import colors from '../../assessts/Colors/Colors';

const Otp = ({ navigation }) => {
  const [isSelected, setSelection] = useState(false);

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity: 0
  const slideAnim = useRef(new Animated.Value(-200)).current; // Initial position: -200 (above the screen)
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Initial scale: 0.8

  useEffect(() => {
    Animated.sequence([
      // Slide-in animation for the logo from the top
      Animated.timing(slideAnim, {
        toValue: 0, // Final position: 0 (original position)
        duration: 1000,
        useNativeDriver: true,
      }),
      // Fade-in animation for the logo
      Animated.timing(fadeAnim, {
        toValue: 1, // Fully visible
        duration: 1000,
        useNativeDriver: true,
      }),
      // Scale animation for the form
      Animated.spring(scaleAnim, {
        toValue: 1, // Original size
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim]);

  return (
    <ImageBackground
      source={require('../../assessts/Morabg.png')} // Replace with your background image path
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.innerContainer}>
        {/* Logo with slide and fade animation */}
        <Animated.Image
          source={require('../../assessts/MoraLOgo.png')} // Replace with your logo image path
          style={[
            styles.logo,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }], // Apply slide animation
            },
          ]}
        />

        {/* Title */}
        <Text style={styles.title}>Create Account</Text>

        {/* Form with zoom animation */}
        <Animated.View style={[styles.form, { transform: [{ scale: scaleAnim }] }]}>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Name"
            placeholderTextColor="#555"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Email"
            placeholderTextColor="#555"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#555"
            secureTextEntry={true}
          />

          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setSelection(!isSelected)}
            >
              {isSelected && <View style={styles.checkboxTick} />}
            </TouchableOpacity>
            <Text style={styles.checkboxText}>
              Yes I accept all terms, conditions, and policies
            </Text>
          </View>

          {/* Signup Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>

          {/* Login Text */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.PrimaryColor,
  },
  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginVertical: 10,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'normal',
    color: colors.button,
    marginTop: 15,
  },
  form: {
    width: '100%',
    marginTop: 50,
  },
  input: {
    backgroundColor: '#FFF',
    color: '#000',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#FF7F3F',
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxTick: {
    width: 14,
    height: 14,
    backgroundColor: '#FF7F3F',
  },
  checkboxText: {
    color: '#FFF',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#FF7F3F',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'normal normal',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#FFF',
    fontSize: 14,
  },
  loginLink: {
    color: '#FF7F3F',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Otp;
