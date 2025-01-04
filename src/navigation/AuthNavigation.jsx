import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Logo from "../screens/Auth/Logo";
import Welcome from "../screens/Auth/Welcome";
import CreatAccount from "../screens/Auth/CreatAccount";
import Otp from "../screens/Auth/Otp";
import Login from "../screens/Auth/Login";
import OtpVerification from "../screens/Auth/OtpVerification";
import ForgotPassword from "../screens/Auth/ForgotPassword";




const AuthNavigation = (props) => {

    const Stack = createNativeStackNavigator();
    const screenOptions = {
        headerShown: false,
    };

    return (
        <NavigationContainer>
            <Stack.Navigator
                // initialRouteName={"Btabs"}
                initialRouteName={props.initRoute}
                screenOptions={{
                    ...screenOptions,
                }}
            >

                <Stack.Screen
                    name="Logo"
                    component={Logo}
                    options={{ title: "Logo" }}
                />
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{ title: "Welcome" }}
                />
                <Stack.Screen
                    name="CreatAccount"
                    component={CreatAccount}
                    options={{ title: "CreatAccount" }}
                />
                <Stack.Screen
                    name="Otp"
                    component={Otp}
                    options={{ title: "Otp" }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ title: "Login" }}
                />
                <Stack.Screen
                    name="OtpVerification"
                    component={OtpVerification}
                    options={{ title: "OtpVerification" }}
                />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{ title: "ForgotPassword" }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigation;