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

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const res = await login({email, password});

      if (res.error) {
        Alert.alert('Error', res.error.data?.message || 'Login failed');
      } else {
        dispatch(authUser(res?.data));
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong!');
    }
  };

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity
  const slideAnim = useRef(new Animated.Value(-200)).current; // Initial position
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Initial scale

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

  return (
    <ImageBackground
      source={require('../../assessts/Otpbg.png')}
      style={styles.container}
      resizeMode="cover">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          {/* Animated Logo */}
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

          {/* Login Title */}
          <Text style={styles.title}>Login</Text>

          {/* Form with Zoom Animation */}
          <Animated.View
            style={[styles.form, {transform: [{scale: scaleAnim}]}]}>
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

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={() => console.log('Forgot Password Pressed')}>
              <Text style={styles.forgotPassword}>Forgot Password</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Login Button"
              accessibilityHint="Press to login">
              <Text style={styles.buttonText}>
                {isLoading ? 'Loading...' : 'Login'}
              </Text>
            </TouchableOpacity>

            {/* Signup Section */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('CreatAccount')}>
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
