import React from 'react';
import {View} from 'react-native';
import ContactListApp from "./views/contact-list/ContactListApp";
import IndexApp from "./views/IndexApp"
import FlexLab from "./views/FlexLab";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import NavigatorIcon from "./shares/components/NavigatorIcon";
import DetailApp from "./views/contact-list/DetailApp";

const HomeStack = createStackNavigator({
    Home: IndexApp,
});

HomeStack.navigationOptions = {
    tabBarLabel: <View/>,
        tabBarIcon: ({focused}) => (
        <NavigatorIcon
            text={"Home"}
            icon={"md-home"}
            focused={focused}
        />
    ),
};

const ContactListStack = createStackNavigator({
    ContactList: ContactListApp,
    Detail: DetailApp
});

ContactListStack.navigationOptions = {
    tabBarLabel: <View/>,
        tabBarIcon: ({focused}) => (
        <NavigatorIcon
            text={"AtoZApp"}
            icon={"md-book"}
            focused={focused}
        />
    ),
};

const FlexLabStack = createStackNavigator({
    FlexLab: FlexLab
});

FlexLabStack.navigationOptions = {
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
    Home: HomeStack,
    ContactList: ContactListStack,
    FlexLab: FlexLabStack
});

export default createAppContainer(BottomTabNavigator);

