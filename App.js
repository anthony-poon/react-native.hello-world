import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import AtoZApp from "./view/AtoZApp";
import IndexApp from "./view/IndexApp"
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import NavigatorIcon from "./share/component/NavigatorIcon";

const BottomTabNavigator = createBottomTabNavigator({
    Home: {
        screen: IndexApp,
        navigationOptions: {
            tabBarLabel: <View/>,
            tabBarIcon: ({focused}) => (
                <NavigatorIcon
                    text={"Home"}
                    icon={"md-home"}
                    focused={focused}
                />
            ),
        }
    },
    AtoZApp: {
        screen: AtoZApp,
        navigationOptions: {
            tabBarLabel: <View/>,
            tabBarIcon: ({focused}) => (
                <NavigatorIcon
                    text={"AtoZApp"}
                    icon={"md-book"}
                    focused={focused}
                />
            ),
        }
    },
});

const MainNavigator = createStackNavigator({
    BottomTabNavigator,
});

export default createAppContainer(MainNavigator);

