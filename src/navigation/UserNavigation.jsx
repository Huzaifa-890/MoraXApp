import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Exchange from "../screens/User/Exchange";
import Mine from "../screens/User/Mine";
import Friends from "../screens/User/Friends";
import Settings from "../screens/User/Settings";
import Earn from "../screens/User/Earn";
import Airdrop from "../screens/User/Airdrop";

const ExchangeStack = createStackNavigator();
const MineStack = createStackNavigator();
const FriendsStack = createStackNavigator();
const SettingStack = createStackNavigator();
const EarnStack = createStackNavigator();
const AirdropStack = createStackNavigator();

function ExchangeTab() {
  return (
    <ExchangeStack.Navigator initialRouteName="Exchange">
      <ExchangeStack.Screen name="Exchange" component={Exchange} options={{ headerShown: false }} />
    </ExchangeStack.Navigator>
  );
}

function MineTab() {
  return (
    <MineStack.Navigator initialRouteName="Mine">
      <MineStack.Screen name="Mine" component={Mine} options={{ headerShown: false }} />
    </MineStack.Navigator>
  );
}

function FriendsTab() {
  return (
    <FriendsStack.Navigator initialRouteName="Friends">
      <FriendsStack.Screen name="Friends" component={Friends} options={{ headerShown: false }} />
    </FriendsStack.Navigator>
  );
}

function SettingTab() {
  return (
    <SettingStack.Navigator initialRouteName="Setting">
      <SettingStack.Screen name="Setting" component={Settings} options={{ headerShown: false }} />
    </SettingStack.Navigator>
  );
}

function EarnTab() {
  return (
    <EarnStack.Navigator initialRouteName="Earn">
      <EarnStack.Screen name="Earn" component={Earn} options={{ headerShown: false }} />
    </EarnStack.Navigator>
  );
}
function AirdropTab() {
  return (
    <AirdropStack.Navigator initialRouteName="Airdrop">
      <EarnStack.Screen name="Airdrop" component={Airdrop} options={{ headerShown: false }} />
    </AirdropStack.Navigator>
  );
}

const BtabNavigation = (props) => {
  const Tab = createBottomTabNavigator();
  const [screenName, setScreenName] = useState();
  const routeNameRef = useRef();
  const navigationRef = useRef();

  // Use an Animated value for sliding effect
  const tabBarAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the tab bar on mount
    Animated.timing(tabBarAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <NavigationContainer
      style={styles.NavigationContainer}
      ref={navigationRef}
      onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute().name)}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          setScreenName(currentRouteName);
        }

        routeNameRef.current = currentRouteName;
      }}
    >
      <Tab.Navigator
        initialRouteName={props.initRoute}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#504B4B80",
            height: 90,
            position: "absolute",
            bottom: 20,
            marginHorizontal: 10,
            borderRadius: 20,
            transform: [
              {
                translateY: tabBarAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0], // Starts from the bottom
                }),
              },
            ],
          },
        }}
      >
        <Tab.Screen
          name="ExchangeTab"
          component={ExchangeTab}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={[styles.tabItemContainer, focused && styles.focusedTabItemContainer]}
              >
                <View style={styles.iconWrapper}>
                  <Icon name="bitcoin" size={30} color={focused ? "#F0B90B" : "rgba(255, 255, 255, 0.6)"} />
                </View>
                <Text style={focused ? styles.focusedText : styles.unfocusedText}>Exchange</Text>
              </View>
            ),
            tabBarLabel: () => null,
          }}
        />

        <Tab.Screen
          name="Mine"
          component={MineTab}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={[styles.tabItemContainer, focused && styles.focusedTabItemContainer]}
              >
                <View style={styles.iconWrapper}>
                  <Icon name="hammer-sickle" size={30} color={focused ? "#F0B90B" : "rgba(255, 255, 255, 0.6)"} />
                </View>
                <Text style={focused ? styles.focusedText : styles.unfocusedText}>Mine</Text>
              </View>
            ),
            tabBarLabel: () => null,
          }}
        />

        <Tab.Screen
          name="Friends"
          component={FriendsTab}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={[styles.tabItemContainer, focused && styles.focusedTabItemContainer]}
              >
                <View style={styles.iconWrapper}>
                  <FontAwesome5
                    name="users"
                    size={30}
                    color={focused ? "#F0B90B" : "rgba(255, 255, 255, 0.6)"}
                  />
                </View>
                <Text style={focused ? styles.focusedText : styles.unfocusedText}>Friends</Text>
              </View>
            ),
            tabBarLabel: () => null,
          }}
        />

        <Tab.Screen
          name="EarnTab"
          component={EarnTab}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={[styles.tabItemContainer, focused && styles.focusedTabItemContainer]}
              >
                <View style={styles.iconWrapper}>
                  <FontAwesome5 name="coins" size={30} color={focused ? "#F0B90B" : "rgba(255, 255, 255, 0.6)"} />
                </View>
                <Text style={focused ? styles.focusedText : styles.unfocusedText}>Earn</Text>
              </View>
            ),
            tabBarLabel: () => null,
          }}
        />

        <Tab.Screen
          name="AirdropTab"
          component={AirdropTab}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={[styles.tabItemContainer, focused && styles.focusedTabItemContainer]}
              >
                <View style={styles.iconWrapper}>
                  <Ionicons
                    name="logo-bitcoin"
                    size={30}
                    color={focused ? "#F0B90B" : "rgba(255, 255, 255, 0.6)"}
                  />
                </View>
                <Text style={focused ? styles.focusedText : styles.unfocusedText}>Airdrop</Text>
              </View>
            ),
            tabBarLabel: () => null,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BtabNavigation;

const styles = StyleSheet.create({
  NavigationContainer: {
    backgroundColor: "transparent",
  },
  tabItemContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "transparent",
    marginTop: 50,
  },
  focusedTabItemContainer: {
    backgroundColor: "#2E1435",
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  focusedText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 6,
  },
  unfocusedText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
    marginTop: 8,
  },
});
