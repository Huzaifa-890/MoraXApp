import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import colors from '../../assessts/Colors/Colors';
import { useOtpMutation } from '../../redux/authSlice/authSlice';

const Otp = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const { formData } = route.params; 

  console.log(formData);
  // Redux mutation for verifying OTP
  const [verifyOtp,{isLoading}] = useOtpMutation();

  // Handle OTP input change
  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Automatically move focus to the next input
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Submit OTP for verification
  const handleOtpSubmit = async () => {
    const enteredOtp = otp.join(''); // Combine OTP digits into a single string

    if (enteredOtp.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit OTP.');
      return;
    }
    setErrorMessage('');
    setLoading(true);

    try {
      // Log the payload being sent

      // Make the API call to verify OTP
      const response = await verifyOtp({ email:formData.email,name:formData.name,password:formData.password, otp: enteredOtp }).unwrap();

      // Log the full response
      console.log('API Response:', response);

      if (!response?.error) {
        console.log('OTP Verified Successfully!');
        navigation.navigate('OtpVerification'); // Navigate to the next screen
      } else {
        setErrorMessage(response?.message || 'Invalid OTP. Please try again.');
        console.error('API Error (Failed):', response);
      }
    } catch (err) {
      // Log detailed error information
      console.error('Verification Error:', err);

      if (err?.data) {
        console.log('Error Data:', err.data);
        setErrorMessage(err.data.message || 'Error verifying OTP. Please try again later.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assessts/Otpbg.png')}
        style={styles.container}
        resizeMode="cover">
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assessts/MoraLOgo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Verify your Email</Text>
        </View>

        <Text style={styles.description}>
          We have sent you a one-time password to this email address:
        </Text>
        <Text style={styles.email}>{formData.email}</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
        </View>

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleOtpSubmit}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Submit</Text>
          )}
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'normal',
    color: colors.button,
    marginTop: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 25,
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '80%',
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#f9a826',
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    borderRadius: 8,
    margin: 10,
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#FF7F3F',
    paddingVertical: 10,
    paddingHorizontal: 130,
    borderRadius: 20,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Otp;
