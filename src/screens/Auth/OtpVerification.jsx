import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Image,
} from 'react-native';

const OtpVerification = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false); // Modal initially hidden
  const [otp, setOtp] = useState('');
  const logoPosition = useRef(new Animated.Value(0)).current; // For moving logo animation

  useEffect(() => {
    // Start logo animation after 1 second
    setTimeout(() => {
      Animated.timing(logoPosition, {
        toValue: -100, // Moves logo upwards
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Show modal after logo animation
      setTimeout(() => {
        setModalVisible(true); // Open modal after 2 seconds
      }, 500);
    }, 1000);
  }, []);

  const handleVerification = () => {
    console.log('OTP Verified:', otp);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Logo and Header */}
      <Animated.View style={[styles.header, { transform: [{ translateY: logoPosition }] }]}>
        <Image
          source={require('../../assessts/MoraLOgo.png')} // Replace with your image path
          style={styles.coinImage}
        />
        <Text style={styles.title}>MORA-X</Text>
        <Text style={styles.subtitle}>Thank you Verification</Text>
      </Animated.View>

      {/* Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require('../../assessts/MoraLOgo.png')} // Replace with your logo image
              style={styles.logo}
            />
            <Text style={styles.modalTitle}>Your Email is Verify</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              value={otp}
              onChangeText={setOtp}
            />
            <TouchableOpacity style={styles.button} onPress={handleVerification}>
              <Text style={styles.buttonText}>Go ahead</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090017',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  coinImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    color: '#F9A825',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#D4AF37',
    fontSize: 14,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: '#13002E',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#1E0336',
    padding: 10,
    borderRadius: 10,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
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
