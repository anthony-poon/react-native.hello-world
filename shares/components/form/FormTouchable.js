import React from "react"
import PropTypes from "prop-types";
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import {SpacingStyle, TextStyle} from "../../styles";

export default class FormTouchable extends React.Component {

    render() {
        const {
            title,
            type,
            ...rest
        } = this.props;
        return (
            <TouchableOpacity {...rest} style={styles.container}>
                <Text style={styles[type.toLowerCase()]}>{title}</Text>
            </TouchableOpacity>
        );
    }
}

FormTouchable.defaultProps = {
    type: "default"
};

FormTouchable.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        "default",
        "secondary",
        "primary",
        "info",
        "danger"
    ]),
    onPress: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        ...SpacingStyle.py3,
        width: "100%",
        alignItems: "center",

    },
    default: {
        ...TextStyle.default,
    },
    secondary: {
        ...TextStyle.secondary
    },
    primary: {
        ...TextStyle.primary
    },
    info: {
        ...TextStyle.info
    },
    danger: {
        ...TextStyle.danger
    },
});