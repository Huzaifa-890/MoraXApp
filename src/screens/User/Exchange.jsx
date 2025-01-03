import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../../assessts/Colors/Colors';
import { windowHeight, windowWidth } from '../../Utils/Config/Dimension/Dimention';


const Exchange = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Exchangefwefew</Text>
    </View>
  );
};

export default Exchange;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    backgroundColor: colors.PrimaryColor, // Light background for a clean look
    padding: 16, // Adds padding around the content]
   width:windowWidth,
   height:windowHeight,

  },
  title: {
    fontSize: 24, // Larger font size for emphasis
    fontWeight: 'bold', // Bold text for the title
    color: '#333', // Dark text color for contrast
    textAlign: 'center', // Centers the text
  },
});
