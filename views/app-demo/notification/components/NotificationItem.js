import React from "react";
import ListItem from "../../../../shares/components/list/ListItem";
import {Text, View, StyleSheet, TouchableOpacity, Vibration} from "react-native";
import {BackgroundStyle, SpacingStyle, TextStyle} from "../../../../shares/styles";
import PropTypes from "prop-types";
import {Ionicons as Icon} from "@expo/vector-icons";

export default class NotificationItem extends React.Component {
    handlePress(evt) {
        const {
            isSelectMode,
            onPress,
            onSelect
        } = this.props;
        console.log(isSelectMode);
        if (isSelectMode) {
            onSelect && onSelect(evt);
        } else {
            onPress && onPress(evt);
        }
    }

    handleLongPress(evt) {
        const {
            onLongPress,
            isSelectMode
        } = this.props;
        if (!!onLongPress && !isSelectMode) {
            Vibration.vibrate(100);
            onLongPress(evt);
        }
    }

    renderRhs() {
        const {
            isUnread,
            isSelectMode,
            isSelected,
        } = this.props;
        if (!isSelectMode) {
            if (isUnread) {
                return (
                    <Icon size={16} name={"ios-mail-unread"} style={styles.rhsIcon}/>
                )
            } else {
                return null
            }
        } else {
            if (isSelected) {
                return (
                    <Icon size={16} name={"md-checkbox-outline"} style={[styles.rhsIcon, styles.selected]}/>
                )
            } else {
                return (
                    <Icon size={16} name={"md-square-outline"} style={[styles.rhsIcon, styles.notSelected]}/>
                )
            }
        }
    }

    render() {
        const {
            avatar,
            title,
            content,
            timestamp,
            isUnread,
            onPress,
            onLongPress,
            ...rest
        } = this.props;
        return (
            <ListItem {...rest} containerStyle={!!isUnread ? styles.unread : null}>
                <TouchableOpacity
                    disabled={!onPress && !onLongPress}
                    onPress={evt => this.handlePress(evt)}
                    onLongPress={evt => this.handleLongPress(evt)}
                >
                    <View style={styles.container}>
                        <View style={styles.lhs}>
                            <Text style={styles.avatar}>{avatar}</Text>
                        </View>
                        <View style={styles.middle}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.content}>{content}</Text>
                            <Text style={styles.timestamp}>{timestamp}</Text>
                        </View>
                        <View style={styles.rhs}>
                            {
                                this.renderRhs()
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            </ListItem>
        );
    }
}

NotificationItem.defaultProps = {
    isUnread: false,
    isSelected: false,
    isSelectMode: false,
};

NotificationItem.propTypes = {
    avatar: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    isUnread: PropTypes.bool,
    isSelectMode: PropTypes.bool,
    isSelected: PropTypes.bool,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onSelect: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    unread: {
        backgroundColor: "#F6FAFF"
    },
    lhs: {
        ...BackgroundStyle.primaryTint2,
        ...SpacingStyle.mr3,
        height: 48,
        width: 48,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50
    },
    avatar: {
        ...TextStyle.lg,
        ...TextStyle.light
    },
    middle: {
        flexShrink: 1
    },
    rhs: {
        width: 48,
        justifyContent: "center",
        alignItems: "center",
    },
    rhsIcon: {
        ...TextStyle.primaryTint1,
        ...TextStyle.lg
    },
    selected: {
        ...TextStyle.primaryTint1,
    },
    notSelected: {
        ...TextStyle.muted,
    },
    title: {
        ...TextStyle.lg,
    },
    content: {
        ...TextStyle.secondary,
        ...SpacingStyle.mt1,
        ...SpacingStyle.mb2
    },
    timestamp: {
        ...TextStyle.sm,
        ...TextStyle.secondary,
    }
});