import React from "react";
import PropTypes from "prop-types";
import {MaterialIcons} from '@expo/vector-icons';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native';
import {TextStyle, SpacingStyle} from "../../../shares/styles";

export default class ContactThumbnail extends React.Component {
    render() {
        const {
            avatar,
            mobile,
            name,
            onPress
        } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={onPress} disabled={!onPress}>
                    <Image
                        source={avatar}
                        style={styles.avatar}
                    />
                </TouchableOpacity>
                {!!name && (
                    <Text style={styles.name}>{name}</Text>
                )}
                {!!mobile && (
                    <View style={styles.phoneSection}>
                        <MaterialIcons name="phone" size={16} style={styles.phoneIcon}/>
                        <Text style={styles.phone}>{mobile}</Text>
                    </View>
                )}
            </View>
        );
    }
}

ContactThumbnail.propTypes = {
    name: PropTypes.string,
    avatar: PropTypes.any.isRequired,
    phone: PropTypes.string,
    onPress: PropTypes.func,
};

ContactThumbnail.defaultProps = {
    name: '',
    phone: '',
    textColor: 'white',
    onPress: null,
};

const styles = StyleSheet.create({
    container: {
        ...SpacingStyle.py5,
        ...SpacingStyle.my3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: 'white',
        borderWidth: 2,
    },
    name: {
        ...TextStyle.lg,
        ...TextStyle.bold,
        ...TextStyle.white,
        ...SpacingStyle.mt4,
        ...SpacingStyle.mb1,
    },
    phoneSection: {
        ...SpacingStyle.mt1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    phoneIcon: {
        ...TextStyle.white,
    },
    phone: {
        ...TextStyle.white,
        ...TextStyle.md,
        ...TextStyle.bold,
        ...SpacingStyle.ml1,
    },
});