import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {MaterialIcons as Icon} from '@expo/vector-icons';
import PropTypes from 'prop-types';
import {SpacingStyle, BorderStyle, TextStyle} from "../../../shares/styles";

export default class DetailListItem extends React.Component{
    render() {
        const {
            title,
            subtitle,
            icon,
        } = this.props;
        return (
            <View style={styles.container}>
                <Icon
                    name={icon}
                    size={24}
                    style={styles.icon}
                />
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
            </View>
        );
    }
}


DetailListItem.defaultProps = {
    title: "",
    subtitle: "",
    icon: null,
};

DetailListItem.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        ...SpacingStyle.px4,
        ...SpacingStyle.py3,
        ...BorderStyle.borderBottom,
        flexDirection: "row",
    },
    icon: {
        ...SpacingStyle.mr3
    },
    content: {
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        ...TextStyle.bold,
        ...TextStyle.md,
    },
    subtitle: {
        ...TextStyle.md,
        ...TextStyle.secondary
    },
});
