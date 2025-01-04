import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useDispatch} from 'react-redux';
import colors from '../../assessts/Colors/Colors'; // Path fixed

const OtpVerification = ({navigation,isLoading}) => {
  const dispatch = useDispatch();
  

  const [showContent, setShowContent] = useState(false);


  const handlePress = () => {
 
    if (!isLoading) {
      navigation.navigate('Login');
    }
  };


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
         <Animatable.Text 
                  animation="fadeInDown" 
                  duration={1500} 
                  style={styles.welcomeText}
                >
                  Thank You Verification
                </Animatable.Text>
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
            <Image 
              source={require('../../assessts/modallogo.png')} // Replace with your logo path
              style={styles.logo} 
            />
            <Text style={styles.modalTitle}>Your Email is Verified</Text>
            // 
            <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
            disabled={isLoading}>
            <Text style={styles.buttonText}>
              {isLoading ? 'Loading...' : 'Go Ahead '}
            </Text>
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
    height: '40%', // Adjust modal height
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
    justifyContent: 'between',
    alignItems: 'center',
    backgroundColor: '#1c0439', // Match the primary color
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: '#F4A300', // Border color
    borderTopWidth: 6, // Border width for top
    borderRightWidth: 1,
    borderLeftWidth: 1, // Border
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
 button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDA058',
    paddingVertical: 18,
    paddingHorizontal:120,
    borderRadius: 50,
    elevation: 10,
    shadowColor: '#FF7F3F',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    marginTop: 80,

    // marginTop: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginRight: 10,
  },
  welcomeText: {
    color: '#FDA058',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20, 
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 20,
    marginTop: 20,
  },
});

export default OtpVerification;
