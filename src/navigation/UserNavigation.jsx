import { View, StyleSheet, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Exchange from '../screens/User/Exchange';
import Mine from '../screens/User/Mine';
import Friends from '../screens/User/Friends';
import Settings from '../screens/User/Settings';

const ExchangeStack = createStackNavigator();
const MineStack = createStackNavigator();
const FriendsStack = createStackNavigator();
const SettingStack = createStackNavigator();



function ExchangeTab() {
    return (
        <ExchangeStack.Navigator
            screenOptions={{
                tabBarStyle: {
                    opacity: 0,
                },
            }}
            initialRouteName="Exchange">
            <ExchangeStack.Screen name="Exchange" component={Exchange} options={{ headerShown: false }} />
        </ExchangeStack.Navigator>
    );
}

function MineTab() {
    return (
        <MineStack.Navigator
            screenOptions={{
                tabBarStyle: {
                    opacity: 0,
                },
            }}
            initialRouteName="Mine">
            <MineStack.Screen name="Mine" component={Mine} options={{ headerShown: false }} />
        </MineStack.Navigator>
    );
}

function FriendsTab() {
    return (
        <FriendsStack.Navigator
            screenOptions={{
                tabBarStyle: {
                    opacity: 0,
                },
            }}
            //hereeeeeeeeeee
            initialRouteName="Friends">
            <FriendsStack.Screen
                name="Friends" component={Friends} options={{ headerShown: false, }} />

        </FriendsStack.Navigator>
    );
}

function SettingTab() {
    return (
        <SettingStack.Navigator
            screenOptions={{
                tabBarStyle: {
                    opacity: 0,
                },
            }}
            initialRouteName="Setting">
            <SettingStack.Screen name="Setting" component={Settings} options={{ headerShown: false }} />
        </SettingStack.Navigator>
    );
}


const BtabNavigation = (props) => {
    const Tab = createBottomTabNavigator();

    const [screenName, setScreenName] = useState()

    const routeNameRef = useRef();
    const navigationRef = useRef();
   

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() =>
                (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
            }
            onStateChange={() => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current.getCurrentRoute().name;

                if (previousRouteName !== currentRouteName) {
                    setScreenName(currentRouteName)
                }

                routeNameRef.current = currentRouteName;
            }}
        >
            <Tab.Navigator
                initialRouteName={props.initRoute}
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: "gray",
                        height: 60,
                        shadowColor: "black",
                        position: "absolute",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.67,
                        shadowRadius: 4.65,
                        elevation: 6,
                    },
                    tabBarActiveTintColor: "white",
                }}>
                <Tab.Screen
                    name="ExchangeTab"
                    component={ExchangeTab}
                    style={{ paddingHorizontal: 0 }}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color = 'red', size, focused }) => (
                            <View style={focused ? { marginBottom: 5, alignItems: "center", width: 200 } : { alignItems: "center", width: 100 }}>
                                <FontAwesome5 name="home" color={color} size={size} />
                                <Text style={styles.Text}>Exchange</Text>

                            </View>
                        ),
                        tabBarLabel: ({ focused }) => null,
                    }}
                />
                <Tab.Screen
                    name="Mine"
                    component={MineTab}
                    style={{ paddingHorizontal: 0 }}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color = 'red', size, focused }) => (
                            <View style={focused ? { marginBottom: 5, alignItems: "center", width: 200 } : { alignItems: "center", width: 100 }}>
                                <Ionicons name="bag-handle" color={color} size={size} />
                                <Text style={styles.Text}>Mine</Text>
                            </View>
                        ),
                        tabBarLabel: ({ focused }) => null,
                    }}
                />

                <Tab.Screen
                    name="Friends"
                    component={FriendsTab}
                    style={{ paddingHorizontal: 0 }}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color = 'red', size, focused }) => (
                            <View style={focused ? { marginBottom: 5, alignItems: "center", width: 200 } : { alignItems: "center", width: 100 }}>
                                <FontAwesome5 name="shopping-cart" color={color} size={size} />
                                <Text style={styles.Text}>Profile</Text>
                            </View>
                        ),
                        tabBarLabel: ({ focused }) => null,
                    }}
                />
                <Tab.Screen
                    name="SettingTab"
                    component={SettingTab}
                    style={{ paddingHorizontal: 0 }}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color = 'red', size, focused }) => (
                            <View style={focused ? { marginBottom: 5, alignItems: "center", width: 200 } : { alignItems: "center", width: 100 }}>
                                <Ionicons name="settings" color={color} size={size} />
                                <Text style={styles.Text}>Settings</Text>
                            </View>
                        ),
                        tabBarLabel: ({ focused }) => null,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
export default BtabNavigation;


const styles = StyleSheet.create({
    Text: {
        // color: colors.white,
        // fontFamily: Font.fontJost500,
        fontSize: 12
    }
});
