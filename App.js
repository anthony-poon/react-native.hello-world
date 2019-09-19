import React from 'react';
import {createAppContainer} from 'react-navigation';
import {AppLoading} from "expo";
import * as Font from 'expo-font'
import BottomTabNavigator from "./navigation"

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

