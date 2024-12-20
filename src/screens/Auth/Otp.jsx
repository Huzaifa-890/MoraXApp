import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import colors from "../../assessts/Colors/Colors";

const Otp = ({ navigation }) => {
  const [timer, setTimer] = useState(15);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpExpired, setOtpExpired] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef([]);
  const correctOtp = "1234"; // Dummy OTP

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
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
    setOtp(["", "", "", ""]); // Clear OTP fields
    setErrorMessage(""); // Clear error message
    // Add logic for resending OTP (e.g., API call)
    console.log("OTP Resent!");
  };

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Automatically focus the next input
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpSubmit = () => {
    const enteredOtp = otp.join("");

    if (otpExpired) {
      setErrorMessage("OTP has expired. Please resend OTP.");
      return;
    }

    if (enteredOtp === correctOtp) {
      console.log("OTP Verified Successfully!");
      setOtp(["", "", "", ""]); // Clear OTP fields
      navigation.navigate("Login"); // Replace 'NextScreen' with your target screen name
    } else {
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assessts/Morabg.png")} // Replace with your background image path
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.LogoContainer}>
       
        <Image
               source={require('../../assessts/MoraLOgo.png')}
               style={styles.Logo} // Replace with your logo image path
             />
     
             {/* Title */}
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
              onChangeText={(text) => handleOtpChange(text, index)}
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
        </View>

        {/* Error Message */}
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        {/* Timer and Resend */}
        {otpExpired ? (
          <TouchableOpacity onPress={handleResendOtp}>
          <Text style={styles.resend}>
          <Text style={styles.normalText}>Do not send OTP </Text>
          <Text style={styles.resendText}>Resend OTP</Text>
        </Text>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
title: {
    fontSize: 32,
    fontWeight: 'normal',
    color: colors.button,
    marginTop: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f9a826",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 10,
    lineHeight:25
  },
  email: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "80%",
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#f9a826",
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    backgroundColor: "#1a1a2e",
    borderRadius: 8,
  },
  timer: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    marginBottom: 20,
  },
  resend: {
    color: "#f9a826",
    fontWeight: "bold",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#FF7F3F",
    paddingVertical: 10,
    paddingHorizontal: 130,
    borderRadius: 20,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  LogoContainer:{
 textAlign: "center",
 marginBottom: 30,
  },

  Logo:{
    width: 250,
    height: 250,
    marginBottom: 10,
    resizeMode: 'contain',
  },

  resend: {
    fontSize: 16,
    marginBottom: 10,
    // You can add other common styles here if needed
  },
  normalText: {
    color: "#fff",  // Color for the "Do not send OTP" part
    fontWeight: "normal",
  },
  resendText: {
    color: "#f9a826",  // Color for the "Resend OTP" part
    fontWeight: "bold",
  },
});

export default Otp;
