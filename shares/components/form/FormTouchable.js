import React from "react"
import PropTypes from "prop-types";
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import {SpacingStyle, TextStyle} from "../../styles";
import ListItem from "../list/ListItem";
export default class FormTouchable extends React.Component {

    render() {
        const {
            title,
            type,
            last,
            ...rest
        } = this.props;
        return (
            <ListItem last={last}>
                <TouchableOpacity {...rest} style={styles.container}>
                    <Text style={styles[type.toLowerCase()]}>{title}</Text>
                </TouchableOpacity>
            </ListItem>
        );
    }
}

FormTouchable.defaultProps = {
    type: "default",
    last: false
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
    onPress: PropTypes.func,
    last: PropTypes.bool
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