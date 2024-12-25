import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';

import colors from '../../assessts/Colors/Colors'; // Path fixed
import {useUser} from '../../context/UserContext'; // Replace with your path

const OtpVerification = ({navigation}) => {
  const [showContent, setShowContent] = useState(false);
  const {setIsLogin} = useUser();

  const logoAnim = useRef(new Animated.Value(0)).current;
  const modalAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
      startAnimations();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const startAnimations = () => {
    Animated.timing(logoAnim, {
      toValue: -200, // Move logo upwards (adjust based on design)
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(modalAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleVerification = () => {
    console.log('OTP Verified');
    setIsLogin(true);
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <Animated.View
        style={[styles.logoContainer, {transform: [{translateY: logoAnim}]}]}>
        <Image
          source={require('../../assessts/MoraLOgo.png')} // Path fixed
          style={styles.coinImage}
        />
      </Animated.View>

      {/* Modal Section */}
      {showContent && (
        <Animated.View
          style={[
            styles.shadowWrapper,
            {transform: [{translateY: modalAnim}]},
          ]}>
          {/* Shadow container */}
          <View style={styles.shadowBox}>
            {/* Modal with border */}
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Your Email is Verified</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={handleVerification}>
                <Text style={styles.buttonText}>Go ahead</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: '30%', // Adjust the starting position
    alignItems: 'center',
    zIndex: 10, // Ensure it stays above the modal
  },
  coinImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  shadowWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100.5%',
    height: '50%', // Adjust modal height
  },
  shadowBox: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 12, // Shadow for Android
    shadowColor: 'white', // Shadow color
    shadowOffset: {width: 0, height: -5}, // Shadow only at the top
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c0439', // Match the primary color
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: '#F4A300', // Border color
    borderTopWidth: 4, // Border width for top
    borderRightWidth: 1,
    borderLeftWidth: 1, // Border
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OtpVerification;
