import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../assessts/Colors/Colors';
import { useSignupMutation } from '../../redux/authSlice/authSlice';

const CreateAccount = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [errors, setErrors] = useState({});
  const [signup, { isLoading }] = useSignupMutation();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-200)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value.trim() }));
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Enter a valid email address.';
    if (!formData.password.trim() || formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters.';
    if (formData.password !== formData.password_confirmation)
      newErrors.password_confirmation = 'Passwords do not match.';
    if (!isSelected)
      newErrors.terms = 'You must accept the terms and conditions.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateInputs()) return;

    try {
      const response = await signup(formData);
      if (!response?.error) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Otp', { formData }); // Passing form data to OTP screen
      } else {
        Alert.alert(
          'Error',
          response.error?.data?.message || 'Unable to create account.'
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong! Please try again.');
      console.error('Error during signup:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assessts/Otpbg.png')}
      style={styles.container}
      resizeMode="cover">
      <View style={styles.innerContainer}>
        <Animated.Image
          source={require('../../assessts/MoraLOgo.png')}
          style={[
            styles.logo,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        />
        <Text style={styles.title}>Create Account</Text>

        <Animated.View style={[styles.form, { transform: [{ scale: scaleAnim }] }]}>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Name"
            placeholderTextColor="#555"
            value={formData.name}
            onChangeText={value => handleInputChange('name', value)}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Enter Your Email"
            placeholderTextColor="#555"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={value => handleInputChange('email', value)}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Password"
              placeholderTextColor="#555"
              secureTextEntry={!isPasswordVisible}
              value={formData.password}
              onChangeText={value => handleInputChange('password', value)}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!isPasswordVisible)}
              activeOpacity={0.7}>
              <FontAwesome
                name={isPasswordVisible ? 'eye' : 'eye-slash'}
                size={24}
                color="#555"
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Confirm Password"
              placeholderTextColor="#555"
              secureTextEntry={!isConfirmPasswordVisible}
              value={formData.password_confirmation}
              onChangeText={value =>
                handleInputChange('password_confirmation', value)
              }
            />
            <TouchableOpacity
              onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}
              activeOpacity={0.7}>
              <FontAwesome
                name={isConfirmPasswordVisible ? 'eye' : 'eye-slash'}
                size={24}
                color="#555"
              />
            </TouchableOpacity>
          </View>
          {errors.password_confirmation && (
            <Text style={styles.errorText}>{errors.password_confirmation}</Text>
          )}

          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setSelection(!isSelected)}
              activeOpacity={0.7}>
              {isSelected && <View style={styles.checkboxTick} />}
            </TouchableOpacity>
            <Text style={styles.checkboxText}>
              Yes, I accept all terms, conditions, and policies
            </Text>
          </View>
          {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSignup}
            disabled={isLoading}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>
              {isLoading ? 'Signing Up...' : 'Sign up'}
            </Text>
          </TouchableOpacity>

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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  inputPassword: {
    flex: 1,
    color: '#000',
    fontSize: 16,
    paddingVertical: 10,
  },
});

export default CreateAccount;