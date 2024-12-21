import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import colors from '../../assessts/Colors/Colors';

const Otp = ({navigation}) => {
  const [timer, setTimer] = useState(15);
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [otpExpired, setOtpExpired] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRefs = useRef([]);
  const correctOtp = '12345'; // Dummy OTP

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0) {
      setOtpExpired(true);
    }
  }, [timer]);

  const handleResendOtp = () => {
    setTimer(15); // Reset the timer to 15 seconds
    setOtpExpired(false); // Remove OTP expired message
    setOtp(['', '', '', '', '']); // Clear OTP fields
    setErrorMessage(''); // Clear error message
    console.log('OTP Resent!');
  };

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];

    if (text === '') {
      newOtp[index] = '';
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else {
      newOtp[index] = text;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleOtpSubmit = () => {
    const enteredOtp = otp.join('');

    if (otpExpired) {
      setErrorMessage('OTP has expired. Please resend OTP.');
      return;
    }

    if (enteredOtp === correctOtp) {
      console.log('OTP Verified Successfully!');
      setOtp(['', '', '', '', '']);
      navigation.navigate('OtpVerification');
    } else {
      setErrorMessage('Invalid OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assessts/Otpbg.png')}
        style={styles.container}
        resizeMode="cover">
        <View style={styles.LogoContainer}>
          <Image
            source={require('../../assessts/MoraLOgo.png')}
            style={styles.Logo}
          />

          <Text style={styles.title}>Verify your Email</Text>
        </View>

        <Text style={styles.description}>
          We have sent you a one-time password on this Email Address
        </Text>
        <Text style={styles.email}>example@gmail.com</Text>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={text => handleOtpChange(text, index)}
              ref={ref => (inputRefs.current[index] = ref)}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace' && digit === '') {
                  handleOtpChange('', index);
                }
              }}
            />
          ))}
        </View>

        {/* Error Message */}
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        {/* Timer and Resend */}
        {otpExpired ? (
          <TouchableOpacity onPress={handleResendOtp} style={styles.resend}>
            <Text style={styles.normalText}>Didn’t receive OTP? </Text>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.timer}>
            {`00:${timer < 10 ? `0${timer}` : timer}`}
          </Text>
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleOtpSubmit}>
          <Text style={styles.submitText}>Submit</Text>
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
  title: {
    fontSize: 32,
    fontWeight: 'normal',
    color: colors.button,
    marginTop: 55,
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
  timer: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#FF7F3F',
    paddingVertical: 10,
    paddingHorizontal: 130,
    borderRadius: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
  },
  resendText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF7F3F',
    textDecorationLine: 'underline',
  },
  normalText: {
    fontSize: 16,
    color: '#fff',
  },
  Logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});

export default Otp;
