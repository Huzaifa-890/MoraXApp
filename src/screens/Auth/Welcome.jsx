import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import colors from '../../assessts/Colors/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const Welcome = () => {
  return (
    <ImageBackground 
      source={require('../../assessts/Welcomebg.png')} // Background image path
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Welcome Text */}
        <Animatable.Text 
          animation="fadeInDown" 
          duration={1500} 
          style={styles.welcomeText}
        >
          Welcome To Mora
        </Animatable.Text>

        {/* Animated Coin */}
        <Animatable.Image 
          animation="bounceIn"
          delay={500}
          duration={2000}
          source={require('../../assessts/MoraLOgo.png')} // Coin image path
          style={styles.coinImage}
          resizeMode="contain"
        />

        {/* Get Started Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started!</Text>
          <Icon name="long-arrow-right" size={20} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.PrimaryColor,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    color: '#FFB830',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 70,
  },
  coinImage: {
    width: 350,
    height: 350,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7F3F',
    paddingVertical: 18,
    paddingHorizontal: 70,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#FF7F3F',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    marginTop: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginRight: 10,
  },
  icon: {
    marginLeft: 10, // Space between text and icon
    fontSize:20,
  },
});

export default Welcome;
