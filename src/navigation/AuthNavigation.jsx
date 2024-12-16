import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
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
                    name="Login"
                    component={Login}
                    options={{ title: "Login" }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigation;