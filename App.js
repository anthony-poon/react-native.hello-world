import React from 'react';
import {View} from 'react-native';
import ContactListApp from "./views/contact-list/ContactListApp";
import IndexApp from "./views/IndexApp"
import FlexLab from "./views/FlexLab";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import NavigatorIcon from "./shares/components/NavigatorIcon";
import ViewContactApp from "./views/contact-list/ViewContactApp";
import EditContactApp from "./views/contact-list/EditContactApp";
import {AppLoading} from "expo";
import * as Font from 'expo-font'

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
    DisplayDetail: ViewContactApp,
    EditDetail: EditContactApp,
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

const AppContainer = createAppContainer(BottomTabNavigator);

export default class App extends React.Component {
    state = {
        loading: true
    };

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        });
        this.setState({ loading: false });
    }

    render() {
        const {
            loading
        } = this.state;
        if (loading) {
            return (
                <AppLoading/>
            )
        } else {
            return (
                <AppContainer/>
            );
        }

    }
}

