import React from 'react';
import {createAppContainer} from 'react-navigation';
import {AppLoading} from "expo";
import * as Font from 'expo-font'
import BottomTabNavigator from "./navigation"
import Constants from 'expo-constants';
import { Provider, connect } from 'react-redux';
import * as Sentry from 'sentry-expo';
import {store} from "./redux/store";

Sentry.init({
    dsn: 'https://ada00e88c52b4acc893a639d70c600ee@sentry.io/1800004',
    debug: true
});

Sentry.setRelease(Constants.manifest.revisionId);

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
        return (
            <Provider store={store}>
                {
                    loading ? (
                        <AppLoading/>
                    ) : (
                        <AppContainer/>
                    )
                }
            </Provider>
        )
    }
}

