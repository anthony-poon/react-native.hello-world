import React from 'react';
import { StyleSheet, View } from 'react-native';
import ContactThumbnail from "./components/ContactThumbnail";
import {BackgroundStyle} from "../../shares/styles";
import DetailListItem from "./components/DetailListItem";
import "../../shares/styles/background";
import PropTypes from "prop-types";

export default class DetailApp extends React.Component {
    static navigationOptions = ({ navigation: { state: { params } } }) => {
        return {
            title: "Detail",
        };
    };

    render() {
        const {avatar, name, email, mobile} = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <ContactThumbnail avatar={avatar} name={name} mobile={mobile} />
                </View>
                <View style={styles.bottom}>
                    <DetailListItem icon="mail" title="Email" subtitle={email} />
                    <DetailListItem icon="phone" title="Work" subtitle={mobile} />
                    <DetailListItem icon="smartphone" title="Personal" subtitle={mobile} />
                </View>
            </View>
        );
    }
}

DetailApp.propTypes = {
    navigation: PropTypes.shape({
        state: PropTypes.shape({
            params: PropTypes.shape({
                avatar: PropTypes.any,
                email: PropTypes.string,
                mobile: PropTypes.string,
                name: PropTypes.string,
            }).isRequired
        }).isRequired
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        ...BackgroundStyle.primary,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        ...BackgroundStyle.white,
        flex: 1,
    },
});
