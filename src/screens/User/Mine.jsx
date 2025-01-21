import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import UserLayout from '../../Layout/UserLayout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assessts/Colors/Colors';

const Mine = () => {
  const [activeTab, setActiveTab] = useState('Markets');

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
          <Ionicons name="information-circle-outline" size={16} color="white" />
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

  const Card = ({ icon, title, profitPerHour, level, totalProfit, multiplier }) => (
    <View style={styles.card}>
      {multiplier && (
        <Text style={[styles.multiplier, { color: multiplier.color }]}>{multiplier.text}</Text>
      )}
      <View style={styles.cardHeader}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text style={styles.profitText}>Profit per hour:</Text>
      <View style={styles.profitRow}>
        <Image source={require('../../assessts/ExchangeScreen/MediumIcon.png')} style={styles.coinIcon} />
        <Text style={styles.profitValue}>{profitPerHour}</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.level}>lvl {level}</Text>
        <View style={styles.footerProfit}>
          <Image source={require('../../assessts/ExchangeScreen/MediumIcon.png')} style={styles.coinIcon} />
          <Text style={styles.totalProfit}>{totalProfit}</Text>
        </View>
      </View>
    </View>
  );

  const renderTabContent = () => {
    const marketData = [
      {
        icon: require('../../assessts/ExchangeScreen/MediumIcon.png'),
        title: 'Top 10 cmc pairs',
        profitPerHour: '1.61K',
        level: '13',
        totalProfit: '156.92K',
      },
      {
        icon: require('../../assessts/ExchangeScreen/MediumIcon.png'),
        title: 'Meme coins',
        profitPerHour: '2.2K',
        level: '13',
        totalProfit: '312.2K',
      },
      {
        icon: require('../../assessts/ExchangeScreen/MediumIcon.png'),
        title: 'Margin trading x10',
        profitPerHour: '5.5K',
        level: '13',
        totalProfit: '313.92K',
      },
    ];

    const prTeamData = [
      {
        icon: require('../../assessts/ExchangeScreen/MediumIcon.png'),
        title: 'PR Campaigns',
        profitPerHour: '3.2K',
        level: '15',
        totalProfit: '256.5K',
      },
    ];

    const legalData = [
      {
        icon: require('../../assessts/ExchangeScreen/MediumIcon.png'),
        title: 'Legal Documents',
        profitPerHour: '2.1K',
        level: '12',
        totalProfit: '120.9K',
      },
    ];

    const specialsData = [
      {
        icon: require('../../assessts/ExchangeScreen/MediumIcon.png'),
        title: 'Special Offers',
        profitPerHour: '7.0K',
        level: '18',
        totalProfit: '520.3K',
      },
    ];

    const dataMap = {
      Markets: marketData,
      'PR&Team': prTeamData,
      Legal: legalData,
      Specials: specialsData,
    };

    return (
      <FlatList
        data={dataMap[activeTab]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Card {...item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    );
  };

  return (
    <UserLayout>
      <ScrollView contentContainerStyle={styles.scrollContainer}
      >


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
                    style={styles.totalcoinIcon}
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
                    <View style={styles.Slidecard}>
                      <Image
                        source={require('../../assessts/Mine/Licence-Japan.png')}
                        style={styles.cardImage}
                      />
                      <Text style={styles.cardText}>Licence Japan</Text>
                    </View>
                    <View style={styles.Slidecard}>
                      <Image
                        source={require('../../assessts/Mine/QA-team.png')}
                        style={styles.cardImage}
                      />
                      <Text style={styles.cardText}>QA team</Text>
                    </View>
                    <View style={styles.Slidecard}>
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
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoButton: {
    padding: 4,
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
    padding: 6,
    borderRadius: 10,
    // marginTop: 16,
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
    marginTop: 10,
    
    width: '90%',
    
    borderRadius: 10,
  },
  tabContentText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
 container: {
    flex: 1,
    backgroundColor: '#1a1035', // Main background color
    padding: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e1442', // Tabs background color
    borderRadius: 10,
    marginBottom: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#130228', // Active tab color
  },
  tabText: {
    color: '#9a9aa5', // Inactive tab text color
    fontSize: 16,
  },
  activeTabText: {
    color: '#ffffff', // Active tab text color
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  card: {
    backgroundColor: '#2e244c', // Card background color
    padding: 16,
    borderRadius: 12,
    width: '48%', // Adjust width for two cards per row
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
    flexShrink: 1,
  },
  multiplier: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF5733', // Multiplier color
    alignSelf: 'flex-end',
  },
  profitText: {
    fontSize: 12,
    color: '#cfcfcf',
    marginBottom: 6,
  },
  profitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  coinIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  profitValue: {
    fontSize: 14,
    color: '#ffc107',
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  level: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  footerProfit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalProfit: {
    fontSize: 14,
    color: '#ffc107',
    fontWeight: 'bold',
    marginLeft: 6,
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
  dailyComboContainer: {
    width: '90%',
    marginBottom: 16,
  },
  dailyComboText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dailyCoinIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  totalcoinIcon: {
    width: 65,
    height: 65,
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
  Slidecard: {
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
});


