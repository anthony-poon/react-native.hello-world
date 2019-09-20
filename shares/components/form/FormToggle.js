import React from "react"
import {StyleSheet, Platform, TouchableOpacity} from "react-native"
import FormItem from "./FormItem";
import {Text, Switch, View} from "react-native";
import PropTypes from "prop-types";
import FormTextInput from "./FormTextInput";
import {SpacingStyle, TextStyle} from "../../styles";
import * as Color from "../../styles/var";
import {FontAwesome as Icon} from "@expo/vector-icons";


export default class FormToggle extends React.Component {
    resolveColor() {
        // By default iOS have white thumb and green track
        // Android have green thumb and green tint track
        // This method override the green color to $primary color
        // While retaining the same style on both platform
        const {
            value,
            disabled,
            useThemedColor
        } = this.props;
        if (!!useThemedColor) {
            if (Platform.OS === "ios") {
                if (!!value) {
                    return {
                        trackColor: {
                            true: Color.COLOR_PRIMARY_TINT_1
                        },
                    };
                } else {
                    // use default color if false
                    return {};
                }

            } else {
                if (!disabled) {
                    return {
                        trackColor: {
                            true: Color.COLOR_PRIMARY_TINT_2
                        },
                        // null is default
                        thumbColor: !!value ? Color.COLOR_PRIMARY : null
                    };
                } else {
                    return {};
                }

            }
        }
    }

    render() {
        const {
            label,
            subLabel,
            icon,
            value,
            last,
            indent,
            disabled,
            onValueChange,
            ...rest
        } = this.props;
        return (
            <FormItem last={last}>
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        {
                            !!icon && (
                                <View style={styles.iconWrapper}>
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
                            <Text style={[
                                styles.label,
                                disabled && styles.labelDisabled
                            ]}>{label}</Text>
                            {
                                !!subLabel && (
                                    <Text style={styles.subLabel}>{subLabel}</Text>
                                )
                            }
                        </View>
                    </View>
                    <Switch
                        style={styles.switch}
                        value={value}
                        disabled={disabled}
                        {...rest}
                        onValueChange={onValueChange}
                        {...this.resolveColor()}
                    />
                </View>
            </FormItem>
        );
    }
}

FormToggle.defaultProps = {
    value: false,
    last: false,
    indent: false,
    subLabel: "",
    useThemedColor: false,
    disabled: false
};

FormToggle.propTypes = {
    label: PropTypes.string.isRequired,
    subLabel: PropTypes.string,
    icon: PropTypes.string,
    value: PropTypes.bool,
    last: PropTypes.bool,
    indent: PropTypes.bool,
    disabled: PropTypes.bool,
    useThemedColor: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        ...SpacingStyle.py3,
        flexDirection: "row",
        flexGrow: 1,
        alignItems: "center",
    },
    innerContainer: {
        ...SpacingStyle.pr2,
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: "row",
    },
    content: {
        flexShrink: 1,
    },
    iconWrapper: {
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
    label: {
        ...TextStyle.lg,
        flexGrow: 1,
        flexShrink: 1,
    },
    subLabel: {
        ...TextStyle.sm,
        ...TextStyle.secondary,
        flexShrink: 1
    },
    labelDisabled: {
        ...TextStyle.muted,
    },
    switch: {
        ...SpacingStyle.mr3,
    }

});
