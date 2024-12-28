import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../assessts/Colors/Colors';
import {useLoginMutation} from '../../redux/authSlice/authSlice';
import {useDispatch} from 'react-redux';
import {authUser} from '../../redux/Features/authState';

const Login = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [login, {isLoading}] = useLoginMutation();

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-200)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.delay(200),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Handle Login
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      console.log('Attempting Login with:', email, password);
      const res = await login({email, password});
      console.log('Response:', res);

      // Handle Errors
      if (res?.error) {
        Alert.alert('Error', res.error?.data?.message || 'Login failed');
        console.log('Error Response:', res.error);
        return;
      }

      // Success - Dispatch user data
      if (res?.data) {
        dispatch(authUser(res.data));
        Alert.alert('Success', 'Login Successful!');
      } else {
        Alert.alert('Error', 'Unexpected response from server');
      }
    } catch (error) {
      console.error('Catch Error:', error);
      Alert.alert('Error', 'Something went wrong!');
    }
  };

  return (
    <ImageBackground
      source={require('../../assessts/Otpbg.png')}
      style={styles.container}
      resizeMode="cover">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Animated.Image
            source={require('../../assessts/Loginimg.png')}
            style={[
              styles.logo,
              {
                opacity: fadeAnim,
                transform: [{translateY: slideAnim}, {scale: scaleAnim}],
              },
            ]}
          />

          <Text style={styles.title}>Login</Text>

          <Animated.View style={[styles.form, {transform: [{scale: scaleAnim}]}]}>
            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              placeholderTextColor="#AAAAAA"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Password"
                placeholderTextColor="#AAAAAA"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}>
                <FontAwesome
                  name={showPassword ? 'eye-slash' : 'eye'}
                  size={24}
                  color="#130228"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => console.log('Forgot Password Pressed')}>
              <Text style={styles.forgotPassword}>Forgot Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={isLoading}>
              <Text style={styles.buttonText}>{isLoading ? 'Loading...' : 'Login'}</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('CreatAccount')}>
                <Text style={styles.signupLink}> Sign up</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.PrimaryColor,
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 50,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: '#000',
  },
  eyeIcon: {
    padding: 10,
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
