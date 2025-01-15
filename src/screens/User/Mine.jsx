import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import UserLayout from '../../Layout/UserLayout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assessts/Colors/Colors';

const TabButton = ({ title, active, onPress }) => (
  <TouchableOpacity
    style={[styles.tabButton, active && styles.activeTabButton]}
    onPress={onPress}
  >
    <Text style={[styles.tabText, active && styles.activeTabText]}>{title}</Text>
  </TouchableOpacity>
);

const Mine = () => {
  const [activeTab, setActiveTab] = useState('Markets'); // Default tab
  const boxData = [
    { id: 1, title: 'Earn per tap', value: 12000, coinValue: true, titleColor: '#FF9400' },
    { id: 2, title: 'Coins to level up', value: 10000000, coinValue: false, titleColor: '#5B73F2' },
    { id: 3, title: 'Profit per hour', value: 636310, coinValue: true, titleColor: '#00FF3C' },
  ];

  const formatValue = (value) => {
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return value.toString();
  };

  const AnimatedCounter = ({ endValue }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [displayValue, setDisplayValue] = useState(endValue);

    useEffect(() => {
      const listener = animatedValue.addListener(({ value }) =>
        setDisplayValue(Math.floor(value))
      );

      Animated.timing(animatedValue, {
        toValue: endValue,
        duration: 2000,
        useNativeDriver: false,
      }).start(() => {
        animatedValue.removeAllListeners();
      });

      return () => animatedValue.removeAllListeners();
    }, [endValue]);

    return <Text style={styles.boxValue}>{formatValue(displayValue)}</Text>;
  };

  const CountdownTimer = ({ initialTime }) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
      const interval = setInterval(() => {
        if (time > 0) {
          setTime((prevTime) => prevTime - 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [time]);

    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secondsRemaining = seconds % 60;

      return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${secondsRemaining < 10 ? '0' + secondsRemaining : secondsRemaining}`;
    };

    return (
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(time)}</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Markets':
        return <Text style={styles.tabContentText}>Markets content goes here...</Text>;
      case 'PR&Team':
        return <Text style={styles.tabContentText}>PR & Team content goes here...</Text>;
      case 'Legal':
        return <Text style={styles.tabContentText}>Legal content goes here...</Text>;
      case 'Specials':
        return <Text style={styles.tabContentText}>Specials content goes here...</Text>;
      default:
        return null;
    }
  };

  return (
    <UserLayout>
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
        <CountdownTimer initialTime={9000} />
        <View style={styles.dailyComboContainer}>
          <View style={styles.dailyComboHeader}>
            <Text style={styles.dailyComboText}>Daily combo</Text>
            <View style={styles.rewardContainer}>
              <Image
                source={require('../../assessts/ExchangeScreen/smallCoin.png')}
                style={styles.dailyCoinIcon}
              />
              <Text style={styles.rewardText}>+5,000,000</Text>
              <Ionicons name="checkmark-circle" size={20} color="#00FF00" />
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Image
                source={require('../../assessts/Mine/Licence-Japan.png')}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>Licence Japan</Text>
            </View>
            <View style={styles.card}>
              <Image
                source={require('../../assessts/Mine/QA-team.png')}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>QA team</Text>
            </View>
            <View style={styles.card}>
              <Image
                source={require('../../assessts/Mine/meme.png')}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>Meme coins</Text>
            </View>
          </View>
        </View>

        {/* Tabs Section */}
        <View style={styles.tabsContainer}>
          {['Markets', 'PR&Team', 'Legal', 'Specials'].map((tab) => (
            <TabButton
              key={tab}
              title={tab}
              active={activeTab === tab}
              onPress={() => setActiveTab(tab)}
            />
          ))}
        </View>
        <View style={styles.tabContentContainer}>{renderTabContent()}</View>
      </ScrollView>
    </UserLayout>
  );
};

export default Mine;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    flexWrap: 'wrap',
  },
  box: {
    flexBasis: '32%',
    backgroundColor: '#2C2549',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  boxTitle: {
    fontSize: 12,
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  coinDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  coinIcon: {
    width: 65,
    height: 65,
  },
  coinText: {
    color: '#FFFFFF',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 15,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    width: '90%',
  },
  timerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoButton: {
    padding: 8,
    borderRadius: 12,
  },
  dailyComboContainer: {
    width: '90%',
    marginBottom: 16,
  },
  dailyComboHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#2C2549',
    padding: 8,
    borderRadius: 4,
  },
  dailyComboText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dailyCoinIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  rewardText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginRight: 4,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#2C2549',
    borderRadius: 10,
    alignItems: 'center',
    padding: 8,
    width: '30%',
  },
  cardImage: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2C2549',
    padding: 10,
    borderRadius: 10,
    marginTop: 16,
    width: '90%',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  activeTabButton: {
    backgroundColor: colors.PrimaryColor,
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  tabContentContainer: {
    marginTop: 16,
    padding: 10,
    width: '90%',
    backgroundColor: '#2C2549',
    borderRadius: 10,
  },
  tabContentText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
