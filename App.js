import React from 'react';
import {View} from 'react-native';
import AtoZApp from "./views/AtoZApp";
import IndexApp from "./views/IndexApp"
import FlexLab from "./views/FlexLab";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import NavigatorIcon from "./shares/components/NavigatorIcon";


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
    FlexLab: {
        screen: FlexLab,
        navigationOptions: {
            tabBarLabel: <View/>,
            tabBarIcon: ({focused}) => (
                <NavigatorIcon
                    text={"FlexLab"}
                    icon={"md-book"}
                    focused={focused}
                />
            ),
        }
    }
});

const MainNavigator = createStackNavigator({
    BottomTabNavigator,
});

export default createAppContainer(MainNavigator);

