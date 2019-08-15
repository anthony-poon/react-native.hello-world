import React from "react";
import {View, Text, StyleSheet} from "react-native"
import PropTypes from "prop-types";
import {Ionicons} from "@expo/vector-icons";
import {TextStyle} from "../style";

export default class NavigatorIcon extends React.Component {
    render() {
        const {
            text,
            icon,
            focused
        } = this.props;
        return (
            <View style={styles.iconWrapper}>
                <Ionicons
                    style={focused ? styles.iconFocused : styles.icon}
                    name={icon}
                />
                <Text style={focused ? styles.textFocused : styles.text}>{text}</Text>
            </View>
        );
    }
}

NavigatorIcon.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    focused: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
    iconWrapper: {
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        ...TextStyle.xl
    },
    iconFocused: {
        ...TextStyle.xl,
        ...TextStyle.textPrimary
    },
    text :{
        ...TextStyle.sm
    },
    textFocused :{
        ...TextStyle.sm,
        ...TextStyle.textPrimary
    }

});