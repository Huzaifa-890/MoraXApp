import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
} from 'react-native';
import colors from '../../assessts/Colors/Colors';
import {useUser} from '../../context/UserContext';


const Login = ({navigation}) => {
  const {setIsLogin} = useUser();

 

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity
  const slideAnim = useRef(new Animated.Value(-200)).current; // Initial position
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Initial scale

  useEffect(() => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require('../../assessts/Otpbg.png')}
      style={styles.container}
      resizeMode="cover">
      <View style={styles.innerContainer}>
        {/* Animated Logo */}
        <Animated.Image
          source={require('../../assessts/Loginimg.png')}
          style={[
            styles.logo,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}
        />

        {/* Login Title */}
        <Text style={styles.title}>Login</Text>

        {/* Form with Zoom Animation */}
        <Animated.View style={[styles.form, {transform: [{scale: scaleAnim}]}]}>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email / Phone"
            placeholderTextColor="#AAAAAA"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#AAAAAA"
            secureTextEntry={true}
          />

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => console.log('Forgot Password Pressed')}>
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsLogin(true)}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Signup Section */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Do you have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('CreatAccount')}>
              <Text style={styles.signupLink}> Sign up</Text>
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
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.button,
    marginBottom: 20,
  },
  form: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    gap: 10,
  },
  input: {
    backgroundColor: '#FFF',
    color: '#000',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#AAAAAA',
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF9C50',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  signupText: {
    color: '#FFF',
    fontSize: 16,
  },
  signupLink: {
    color: '#FF9C50',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default Login;
