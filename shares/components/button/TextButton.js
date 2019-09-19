import React from "react"
import {StyleSheet, TouchableOpacity} from "react-native";
import PropTypes from "prop-types"
import {BackgroundStyle, SpacingStyle, TextStyle} from "../../styles";
import {Text} from "native-base";

export default class TextButton extends React.Component {
    render() {
        const {
            children,
            type,
            ...rest
        } = this.props;
        return (
            <TouchableOpacity {...rest} style={styles.container}>
                <Text style={styles[type.toLowerCase()]}>{children}</Text>
            </TouchableOpacity>
        );
    }
}

TextButton.defaultProps = {
    type: "default"
};

TextButton.propTypes = {
    children: PropTypes.string.isRequired,
    type: PropTypes.string
};

const styles = StyleSheet.create({
    container: {
        ...SpacingStyle.py2,
        ...SpacingStyle.px3,
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