import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';

// Replace this with the actual hook import
import { useUser } from '../../context/UserContext'; // Example: Replace with actual path

// Placeholder for colors (replace with actual colors import if needed)
const colors = {
  PrimaryColor: '#1A1A1A', // Replace with your color
  dialOutline: '#FF8C00', // Replace with your outline color
};

const OtpVerification = ({ navigation }) => {
  // State and Hooks
  const [otp, setOtp] = useState('');
  const [showContent, setShowContent] = useState(false);

  // User context
  const { setIsLogin } = useUser(); // Replace this with your actual context call

  // Animation refs
  const logoAnim = useRef(new Animated.Value(0)).current; // Logo Animation
  const modalAnim = useRef(new Animated.Value(300)).current; // Modal Animation

  useEffect(() => {
    // Start animations after 2 seconds
    const timer = setTimeout(() => {
      setShowContent(true);
      startAnimations();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Start Animation
  const startAnimations = () => {
    Animated.timing(logoAnim, {
      toValue: -50, // Moves logo upwards
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(modalAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Handle Verification
  const handleVerification = () => {
    console.log('OTP Verified:', otp);
    setIsLogin(true); // Update login state (ensure `useUser` context supports this)

    // Navigate to the next screen
    navigation.navigate('Home'); // Replace 'Home' with your desired screen name
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ translateY: logoAnim }] },
        ]}
      >
        <Image
          source={require('../../assessts/MoraLOgo.png')} // Replace with your logo
          style={styles.coinImage}
        />
      </Animated.View>

      {/* Modal Section */}
      {showContent && (
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY: modalAnim }] },
          ]}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Your Email is Verified</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleVerification} // Added the handler
            >
              <Text style={styles.buttonText}>Go ahead</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryColor,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 1, // Prevents overflow and ensures proper scaling
  },
  logoContainer: {
    marginTop: 100, // Adjusted margin to prevent logo cutoff
    alignItems: 'center',
    padding: 20,
  },
  coinImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain', // Ensures image fits properly
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.PrimaryColor,
    padding: 80, // Reduced padding to prevent modal overlap
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderLeftWidth: 4,
    borderColor: colors.dialOutline,
    shadowColor: '#DCBD36',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10, // Added for Android shadow
  },
  modalContent: {
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF8C00',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default OtpVerification;
