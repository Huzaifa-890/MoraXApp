import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image, ImageBackground } from 'react-native';
import colors from '../../assessts/Colors/Colors';

const Logo = ({ navigation }) => {
  const progressBarWidth = useRef(new Animated.Value(0)).current; // Animated value for progress bar
  const [progress, setProgress] = useState(0); // State for percentage text
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animated value for fade-in effect

  useEffect(() => {
    // Fade-in animation for logo
    Animated.timing(fadeAnim, {
      toValue: 1,  // Fade to fully visible
      duration: 2000, // Duration for the fade-in effect
      useNativeDriver: true,
    }).start();

    // Animate progress bar to 100% over 5 seconds
    Animated.timing(progressBarWidth, {
      toValue: 100,
      duration: 5000, // 5 seconds
      useNativeDriver: false,
    }).start(() => {
      // After animation completes, navigate to Welcome screen
      navigation.replace('Welcome');
    });

    // Update percentage state alongside animation
    const interval = setInterval(() => {
      progressBarWidth.addListener(({ value }) => {
        setProgress(Math.round(value)); // Update percentage
      });
    }, 50); // Update every 50ms for smooth progress

    // Cleanup listeners and intervals
    return () => {
      clearInterval(interval);
      progressBarWidth.removeAllListeners();
    };
  }, [navigation, progressBarWidth, fadeAnim]);

  // Interpolate progress bar width for smooth animation
  const progressBarStyle = {
    width: progressBarWidth.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    }),
  };

  return (
  
    <ImageBackground 
      source={require('../../assessts/Morabg.png')} // Replace with your background image path
      style={styles.container}
      resizeMode="cover" // Makes sure the background image covers the entire screen
    >
      <View style={styles.logoContainer}>
        {/* Logo with fade-in effect */}
        <Animated.Image
          source={require('../../assessts/MoraLOgo.png')} // Replace with your logo's path
          style={[styles.logoImage, { opacity: fadeAnim }]} // Apply fade-in animation
          resizeMode="contain"
        />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Text style={styles.progressText}>{progress}%</Text>
        <View style={styles.progressBarBackground}>
          <Animated.View style={[styles.progressBar, progressBarStyle]} />
        </View>
      </View>
    </ImageBackground>
   
  );
};

const styles = StyleSheet.create({

  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:colors.PrimaryColor,
  },
  logoContainer: {
    marginBottom: 50,
  },
  logoImage: {
    width: 300,
    height: 300,
  },
  progressBarContainer: {
    width: '80%',
    alignItems: 'center',
    marginVertical: 70,
    position: 'relative',
  },
  progressText: {
    position: 'absolute',
    top: -20, // Moves the percentage text above the bar
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA500', // Orange text color to match the design
  },
  progressBarBackground: {
    width: '100%',
    height: 12,
    backgroundColor: 'transparent',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 20,
    borderWidth: 1, // Add border width
    borderColor: '#FFD700', // Set the border color (gold for example)
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFA500', // Orange color for the bar
    borderRadius: 6, // Rounded edges for the progress bar
    shadowColor: '#FFA500', // Adds a glow effect
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5, // Smooth edges and shadow
    elevation: 3, // For Android shadow effect
  },
});

export default Logo;
