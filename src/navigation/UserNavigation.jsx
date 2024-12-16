import { View, StyleSheet, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/User/Home';
import About from '../screens/User/About';
import Profile from '../screens/User/Profile';
import Settings from '../screens/User/Settings';

const HomeStack = createStackNavigator();
const OrderStack = createStackNavigator();
const CartStack = createStackNavigator();
const SettingStack = createStackNavigator();



function HomeTab() {
    return (
        <HomeStack.Navigator
            screenOptions={{
                tabBarStyle: {
                    opacity: 0,
                },
            }}
            initialRouteName="Home">
            <HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
}

function AboutTab() {
    return (
        <OrderStack.Navigator
            screenOptions={{
                tabBarStyle: {
                    opacity: 0,
                },
            }}
            initialRouteName="About">
            <OrderStack.Screen name="About" component={About} options={{ headerShown: false }} />
        </OrderStack.Navigator>
    );
}

function ProfileTab() {
    return (
        <CartStack.Navigator
            screenOptions={{
                tabBarStyle: {
                    opacity: 0,
                },
            }}
            //hereeeeeeeeeee
            initialRouteName="Profile">
            <CartStack.Screen
                name="Profile" component={Profile} options={{ headerShown: false, }} />

        </CartStack.Navigator>
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
                    name="HomeTab"
                    component={HomeTab}
                    style={{ paddingHorizontal: 0 }}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color = 'red', size, focused }) => (
                            <View style={focused ? { marginBottom: 5, alignItems: "center", width: 200 } : { alignItems: "center", width: 100 }}>
                                <FontAwesome5 name="home" color={color} size={size} />
                                <Text style={styles.Text}>Home</Text>

                            </View>
                        ),
                        tabBarLabel: ({ focused }) => null,
                    }}
                />
                <Tab.Screen
                    name="OrdersTab"
                    component={AboutTab}
                    style={{ paddingHorizontal: 0 }}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color = 'red', size, focused }) => (
                            <View style={focused ? { marginBottom: 5, alignItems: "center", width: 200 } : { alignItems: "center", width: 100 }}>
                                <Ionicons name="bag-handle" color={color} size={size} />
                                <Text style={styles.Text}>About</Text>
                            </View>
                        ),
                        tabBarLabel: ({ focused }) => null,
                    }}
                />

                <Tab.Screen
                    name="CartTab"
                    component={ProfileTab}
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
