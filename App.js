import React from 'react';
import {View} from 'react-native';
import AtoZApp from "./views/AtoZApp";
import IndexApp from "./views/IndexApp"
import FlexLab from "./views/FlexLab";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import NavigatorIcon from "./shares/components/NavigatorIcon";

const homeStack = createStackNavigator({
    Home: IndexApp,
});

homeStack.navigationOptions = {
    tabBarLabel: <View/>,
        tabBarIcon: ({focused}) => (
        <NavigatorIcon
            text={"Home"}
            icon={"md-home"}
            focused={focused}
        />
    ),
};

const aToZStack = createStackNavigator({
    AtoZApp: AtoZApp,
});

aToZStack.navigationOptions = {
    tabBarLabel: <View/>,
        tabBarIcon: ({focused}) => (
        <NavigatorIcon
            text={"AtoZApp"}
            icon={"md-book"}
            focused={focused}
        />
    ),
};

const flexLabStack = createStackNavigator({
    FlexLab: FlexLab
});

flexLabStack.navigationOptions = {
    tabBarLabel: <View/>,
        tabBarIcon: ({focused}) => (
        <NavigatorIcon
            text={"FlexLab"}
            icon={"md-book"}
            focused={focused}
        />
    ),
};

const BottomTabNavigator = createBottomTabNavigator({
    Home: homeStack,
    AtoZApp: aToZStack,
    FlexLab: flexLabStack
});

export default createAppContainer(BottomTabNavigator);

