import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../assessts/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from '../../Utils/Config/Dimension/Dimention';
import UserLayout from '../../Layout/UserLayout';

const Exchange = () => {
  return (
    <UserLayout>
      <ScrollView>
        <Text style={styles.title}>Exchangefwefew</Text>
      </ScrollView>
    </UserLayout>
  );
};

export default Exchange;

const styles = StyleSheet.create({
  title: {
    fontSize: 24, // Larger font size for emphasis
    fontWeight: 'bold', // Bold text for the title
    color: 'white', // Dark text color for contrast
    textAlign: 'center', // Centers the text
  },
});
