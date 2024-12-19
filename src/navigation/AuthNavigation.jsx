import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Logo from "../screens/Auth/Logo";
import Welcome from "../screens/Auth/Welcome";
import Login from "../screens/Auth/Login";


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
                    name="Login"
                    component={Login}
                    options={{ title: "Login" }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigation;