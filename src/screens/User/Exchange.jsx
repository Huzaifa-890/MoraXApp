import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import colors from '../../assessts/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from '../../Utils/Config/Dimension/Dimention';
import UserLayout from '../../Layout/UserLayout';

const Exchange = () => {
  const boxData = [
    {
      id: 1,
      title: 'Earn per tap',
      value: '+12',
      coinValue: true,
      titleColor: '#FF9400', // Orange
    },
    {
      id: 2,
      title: 'Coins to level up',
      value: '10 M',
      coinValue: false,
      titleColor: '#5B73F2', // Blue
    },
    {
      id: 3,
      title: 'Profit per hour',
      value: '+636.31K',
      coinValue: true,
      titleColor: '#00FF3C', // Green
    },
  ];

  // Reusable Box Component
  const InfoBox = ({ title, value, coinValue, titleColor }) => {
    return (
      <View style={styles.box}>
        <Text style={[styles.boxTitle, { color: titleColor }]}>{title}</Text>
        <View style={styles.boxContent}>
          {coinValue && (
            <Image
              source={require('../../assessts/ExchangeScreen/smallCoin.png')} // Fixed path
              style={styles.icon}
            />
          )}
          <Text style={styles.boxValue}>{value}</Text>
        </View>
      </View>
    );
  };

  return (
    <UserLayout>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Exchange</Text>
          <View style={styles.boxContainer}>
            {boxData.map((box) => (
              <InfoBox
                key={box.id}
                title={box.title}
                value={box.value}
                coinValue={box.coinValue}
                titleColor={box.titleColor}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </UserLayout>
  );
};

export default Exchange;

const styles = StyleSheet.create({
  
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 24, // Larger font size for emphasis
    fontWeight: 'bold', // Bold text for the title
    color: 'white', // Dark text color for contrast
    textAlign: 'center', // Centers the text
    marginBottom: 16,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexWrap: 'wrap', // Enable wrapping for responsiveness
  },
  box: {
    flexBasis: '30%', // Adjust size to fit smaller screens
    marginHorizontal: 8,
    marginVertical: 8, // Added margin for wrapping
    backgroundColor: '#2C2549', // Box background color
    borderRadius: 12, // Rounded corners
    padding: 16, // Padding inside the box
    alignItems: 'center', // Center content horizontally
  },
  boxTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  boxContent: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20, // Icon width
    height: 20, // Icon height
    marginRight: 4, // Space between icon and text
  },
  boxValue: {
    color: 'white', // White text color
    fontSize: 16, // Larger font size
    fontWeight: 'bold', // Bold text for emphasis
  },
});
