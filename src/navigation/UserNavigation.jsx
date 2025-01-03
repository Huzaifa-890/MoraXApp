import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Exchange from '../screens/User/Exchange';
import Mine from '../screens/User/Mine';
import Friends from '../screens/User/Friends';
import Settings from '../screens/User/Settings';
import Earn from '../screens/User/Earn';
import colors from '../assessts/Colors/Colors';

const ExchangeStack = createStackNavigator();
const MineStack = createStackNavigator();
const FriendsStack = createStackNavigator();
const SettingStack = createStackNavigator();
const EarnStack = createStackNavigator();

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

const BtabNavigation = (props) => {
    const Tab = createBottomTabNavigator();

    const [screenName, setScreenName] = useState();
    const routeNameRef = useRef();
    const navigationRef = useRef();

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
            }}>
            <Tab.Navigator
                initialRouteName={props.initRoute }
                screenOptions={{
                    headerShown: false, 
                    tabBarStyle: {
                       backgroundColor: '#504B4B80',
                       height: 70,
                       shadowColor: colors.black,
                       position: 'absolute',
                       bottom: 20,
                       marginHorizontal: 20,
                       borderRadius: 20,
                       shadowOffset: {
                          width: 0,
                          height: 3,
                       },
                       shadowOpacity: 0.67,
                       shadowRadius: 4.65,
                       elevation: 6,
                       
                    },
                    // tabBarActiveTintColor: colors.white,
}}
     >
                <Tab.Screen
                    name="ExchangeTab"
                    component={ExchangeTab}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={[styles.iconContainer, focused && styles.focusedIconContainer]}>
                                <FontAwesome5
                                    name="home"
                                    size={24}
                                    color={focused ? "#fff" : "rgba(255, 255, 255, 0.6)"}
                                />
                            </View>
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text style={focused ? styles.focusedText : styles.unfocusedText}>Exchange</Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Mine"
                    component={MineTab}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={[styles.iconContainer, focused && styles.focusedIconContainer]}>
                                <Ionicons
                                    name="bag-handle"
                                    size={24}
                                    color={focused ? "#fff" : "rgba(255, 255, 255, 0.6)"}
                                />
                            </View>
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text style={focused ? styles.focusedText : styles.unfocusedText}>Mine</Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Friends"
                    component={FriendsTab}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={[styles.iconContainer, focused && styles.focusedIconContainer]}>
                                <FontAwesome5
                                    name="user-friends"
                                    size={24}
                                    color={focused ? "#fff" : "rgba(255, 255, 255, 0.6)"}
                                />
                            </View>
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text style={focused ? styles.focusedText : styles.unfocusedText}>Friends</Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="SettingTab"
                    component={SettingTab}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={[styles.iconContainer, focused && styles.focusedIconContainer]}>
                                <Ionicons
                                    name="settings"
                                    size={24}
                                    color={focused ? "#fff" : "rgba(255, 255, 255, 0.6)"}
                                />
                            </View>
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text style={focused ? styles.focusedText : styles.unfocusedText}>Settings</Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Earn"
                    component={EarnTab}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={[styles.iconContainer, focused && styles.focusedIconContainer]}>
                                <Ionicons
                                    name="cash"
                                    size={24}
                                    color={focused ? "#fff" : "rgba(255, 255, 255, 0.6)"}
                                />
                            </View>
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text style={focused ? styles.focusedText : styles.unfocusedText}>Earn</Text>
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default BtabNavigation;
const styles = StyleSheet.create({
    NavigationContainer: {
        backgroundColor: 'transparent', // Set background to transparent
       
    },
    tabBarStyle: {
        backgroundColor: 'black',
        height: 100,
        marginHorizontal: 16,
    
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        borderTopWidth: 0,
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: 'transparent',
    },
    focusedIconContainer: {
        backgroundColor: '#311654',
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: "center",
        alignContent: "center",
        flex: 1,
    },
    focusedText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 4,
    },
    unfocusedText: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 12,
        marginTop: 4,
    },
});

    