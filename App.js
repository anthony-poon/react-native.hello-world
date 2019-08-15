import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import AtoZApp from "./views/AtoZApp";
import IndexApp from "./views/IndexApp"
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import NavigatorIcon from "./shares/components/NavigatorIcon";
import TimeUtilApp from "./shares/components/TimeUtilApp";

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
    TimeUtilApp: {
        screen: TimeUtilApp,
        navigationOptions: {
            tabBarLabel: <View/>,
            tabBarIcon: ({focused}) => (
                <NavigatorIcon
                    text={"TimeUtilApp"}
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

