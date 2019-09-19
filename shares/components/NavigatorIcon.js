import React from "react";
import {View, Text, StyleSheet} from "react-native"
import PropTypes from "prop-types";
import {FontAwesome as Icon} from "@expo/vector-icons";
import {SpacingStyle, TextStyle} from "../styles";

export default class NavigatorIcon extends React.Component {
    render() {
        const {
            text,
            icon,
            focused
        } = this.props;
        return (
            <View style={styles.iconWrapper}>
                <Icon
                    style={focused ? styles.iconFocused : styles.icon}
                    name={icon}
                />
                <Text style={focused ? styles.textFocused : styles.text} numberOfLines={1}>{text}</Text>
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
    },
    icon: {
        ...TextStyle.xl,
        ...TextStyle.muted,
    },
    iconFocused: {
        ...TextStyle.xl,
        ...TextStyle.primary,
    },
    text :{
        ...TextStyle.sm,
        ...TextStyle.muted,
    },
    textFocused :{
        ...TextStyle.sm,
        ...TextStyle.primary,
    }

});