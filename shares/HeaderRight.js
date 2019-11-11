import React from "react";
import {View, Text, StatusBar, StyleSheet, TouchableOpacity, Alert} from "react-native";
import {SpacingStyle, TextStyle} from "./styles";
import {MaterialIcons as Icon} from "@expo/vector-icons";
import {connect} from "react-redux";
import {setCredential, unsetCredential} from "../redux/actions/auth";
import {Authentication, HeartBeat} from "./api";

class HeaderRight extends React.Component{

    async handleLogin() {
        const response = await Authentication.login();
        const {
            setCredential
        } = this.props;
        if (response.type === "success") {
            const jwt = response.params.id_token;
            setCredential(jwt);
        }
    }

    async handleLogout() {
        await Authentication.logout();
        const {
            unsetCredential
        } = this.props;
        unsetCredential();
    }

    async handlePing() {
        const json = await HeartBeat.ping();
        Alert.alert("Result", JSON.stringify(json, null, 4));
    }

    render() {
        const {
            isLoggedIn
        } = this.props;
        return (
            <View style={styles.container}>
                {
                    isLoggedIn ? (
                        <>
                            <TouchableOpacity onPress={() => this.handlePing()}>
                                <Icon name={"message"} style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleLogout()}>
                                <Icon name={"exit-to-app"} style={styles.icon}/>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => this.handlePing()} disabled={true}>
                                <Icon name={"message"} style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleLogin()}>
                                <Icon name={"account-circle"} style={styles.icon}/>
                            </TouchableOpacity>
                        </>
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...SpacingStyle.mx3,
        flexDirection: "row",
        flex: 1,
    },
    icon: {
        ...TextStyle.xl,
        ...SpacingStyle.px2,
        ...SpacingStyle.py3,
    }
});

const mapStateToProp = state => ({
    isLoggedIn: !!state.auth.jwt
});

export default connect(
    mapStateToProp,
    { setCredential, unsetCredential }
)(HeaderRight);