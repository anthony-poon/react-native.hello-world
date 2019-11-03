import {StyleSheet, Text} from "react-native";
import React from "react";
import {Button, Container, Content, View } from "native-base"
import ENV from "../shares/env";
import HeaderRight from "../shares/HeaderRight";
import Constants from 'expo-constants';

export default class IndexApp extends React.Component {
    static navigationOptions = ({ navigation: { state: { params } } }) => {
        return {
            title: "Home",
            headerRight: (
                <HeaderRight/>
            )
        };
    };

    render() {
        const release = Constants.manifest.revisionId || "N/A";
        return (
            <Container>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <Text>Hello World</Text>
                        <Text>Release: {release}</Text>
                        <Text>Loaded ENV: {ENV.DOTENV}</Text>
                    </View>
                </Content>
            </Container>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
