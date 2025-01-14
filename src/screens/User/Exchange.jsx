import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import UserLayout from '../../Layout/UserLayout';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Exchange = () => {
  const boxData = [
    {
      id: 1,
      title: 'Earn per tap',
      value: 12000,
      coinValue: true,
      titleColor: '#FF9400',
    },
    {
      id: 2,
      title: 'Coins to level up',
      value: 10000000,
      coinValue: false,
      titleColor: '#5B73F2',
    },
    {
      id: 3,
      title: 'Profit per hour',
      value: 636310,
      coinValue: true,
      titleColor: '#00FF3C',
    },
  ];

  const formatValue = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  const AnimatedCounter = ({ endValue }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      const listener = animatedValue.addListener(({ value }) =>
        setDisplayValue(Math.floor(value))
      );

      Animated.timing(animatedValue, {
        toValue: endValue,
        duration: 2000,
        useNativeDriver: false,
      }).start();

      return () => {
        animatedValue.removeListener(listener);
      };
    }, [endValue]);

    return <Text style={styles.boxValue}>{formatValue(displayValue)}</Text>;
  };

  const InfoBox = ({ title, value, coinValue, titleColor }) => (
    <View style={styles.box}>
      <Text style={[styles.boxTitle, { color: titleColor }]}>{title}</Text>
      <View style={styles.boxContent}>
        {coinValue && (
          <Image
            source={require('../../assessts/ExchangeScreen/smallCoin.png')}
            style={styles.icon}
          />
        )}
        <AnimatedCounter endValue={value} />
      </View>
    </View>
  );

  const ProgressBar = ({ currentLevel, maxLevel }) => {
    const progressPercentage = (currentLevel / maxLevel) * 100;

    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>Epic</Text>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${progressPercentage}%` }]}
          />
        </View>
        <Text style={styles.level}>{`Level ${currentLevel}/${maxLevel}`}</Text>
      </View>
    );
  };

  return (
    <UserLayout>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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

          <View style={styles.coinDisplay}>
            <Image
              source={require('../../assessts/ExchangeScreen/MediumIcon.png')}
              style={styles.coinIcon}
            />
            <Text style={styles.coinText}>507,981</Text>
          </View>

          <ProgressBar currentLevel={6} maxLevel={10} />

          <Image
            source={require('../../assessts/ExchangeScreen/BigIcon.png')}
            style={styles.largeCoin}
          />

          {/* New Section */}
          <View style={styles.boostSection}>
          <View style={styles.boostLeft}>
            <Ionicons name="flash" size={35} color="#FF9400" style={styles.boostIcon} />
            <Text style={styles.boostText}>6500 / 6500</Text>
          </View>
          <Text style={styles.boostButton}>Boost</Text>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  box: {
    flexBasis: '32%',
    backgroundColor: '#2C2549',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
  },
  boxTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  boxContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  boxValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  coinDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  largeIcon: {
    width: 80,
    height: 80,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  progressContainer: {
    width: '90%',
    alignItems: 'center',
    marginTop: 16,
  },
  progressLabel: {
    color: 'white',
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  progressBar: {
    height: 10,
    width: '100%',
    backgroundColor: '#3A3A3A',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7A00FF',
    borderRadius: 5,
  },
  level: {
    color: 'white',
    fontSize: 14,
    alignSelf: 'flex-end',
  },
  largeCoin: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  coinIcon: {
    width: 75,
    height: 75,
  },
  coinText: {
    color: '#FFFFFF',
    fontSize: 45,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginTop: 15,
  },
  boostSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderRadius: 12,
   
    
    marginTop: 16,
    width: '90%',
  },
  boostLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boostIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  boostText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  boostButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  boostIcon: {
    marginRight: 10,
  },
});
