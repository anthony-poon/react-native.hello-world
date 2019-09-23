import React from "react"
import {StyleSheet, TouchableOpacity, View} from "react-native"
import PropTypes from "prop-types";
import {BackgroundStyle, BorderStyle, SpacingStyle, TextStyle} from "../../styles";
import {Button, Text} from "native-base";
import {FontAwesome as Icon} from "@expo/vector-icons";
import ListItem from "../list/ListItem";

export default class FormRedirection extends React.Component {
    render() {
        const {
            label,
            subLabel,
            last,
            indent,
            icon,
            onPress,
            ...rest
        } = this.props;
        return (
            <>
                <ListItem last={last}>
                    <TouchableOpacity {...rest} style={styles.container} onPress={onPress}>
                        {
                            !!icon && (
                                <View style={styles.lhs}>
                                    <Icon size={16} name={icon}/>
                                </View>

                            )
                        }
                        {
                            !icon && indent && (
                                <View style={styles.indent}/>
                            )
                        }
                        <View style={styles.content}>
                            <Text style={styles.label}>{label}</Text>
                            {
                                !!subLabel && (
                                    <Text style={styles.subLabel}>{subLabel}</Text>
                                )
                            }
                        </View>
                        <Icon
                            name={"angle-right"}
                            size={16}
                            style={styles.rhs}
                        />
                    </TouchableOpacity>
                </ListItem>
            </>
        );
    }
}

FormRedirection.defaultProps = {
    last: false,
    indent: false
};

FormRedirection.propTypes = {
    label: PropTypes.string.isRequired,
    subLabel: PropTypes.string,
    last: PropTypes.bool,
    indent: PropTypes.bool,
    // TODO: Improve icon rendering
    icon: PropTypes.string,
    onPress: PropTypes.func.isRequired,
};


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexGrow: 1,
        alignItems: "center",
    },
    lhs: {
        ...SpacingStyle.mr3,
        ...SpacingStyle.mt1,
        alignSelf: "flex-start",
        height: 16,
        width: 16,
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible"
    },
    indent: {
        ...SpacingStyle.mr3,
        ...SpacingStyle.px2,
    },
    content: {
        ...SpacingStyle.pr1,
        flexGrow: 1,
        flexShrink: 1,
    },
    label: {
        ...TextStyle.lg,
        flexShrink: 1
    },
    subLabel: {
        ...TextStyle.sm,
        ...TextStyle.secondary,
        flexShrink: 1
    },
    rhs: {
        ...TextStyle.muted,
        ...SpacingStyle.mr3,
    },
});