import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import ContactThumbnail from "./components/ContactThumbnail";
import {BackgroundStyle, BorderStyle, SpacingStyle, TextStyle} from "../../../shares/styles";
import DetailListItem from "./components/DetailListItem";
import PropTypes from "prop-types";
import { Icon } from 'react-native-elements'
import {Container, Content} from "native-base";

export default class ViewContactApp extends React.Component {
    static navigationOptions = ({ navigation: { state: { params } } }) => {
        return {
            title: "Detail",
        };
    };

    render() {
        const navigate = this.props.navigation.navigate;
        const {avatar, name, email, mobile} = this.props.navigation.state.params;
        return (
            <Container>
                <Content>
                    <ScrollView style={styles.container}>
                        <View style={styles.top}>
                            <ContactThumbnail avatar={avatar} name={name} mobile={mobile} />
                        </View>
                        <View style={styles.bottom}>
                            <DetailListItem icon="mail" title="Email" subtitle={email} />
                            <DetailListItem icon="phone" title="Work" subtitle={mobile} />
                            <DetailListItem icon="smartphone" title="Personal" subtitle={mobile} />
                            <DetailListItem icon="smartphone" title="Personal" subtitle={mobile} />
                            <DetailListItem icon="smartphone" title="Personal" subtitle={mobile} />
                            <DetailListItem icon="smartphone" title="Personal" subtitle={mobile} />
                            <DetailListItem icon="smartphone" title="Personal" subtitle={mobile} />
                            <DetailListItem icon="smartphone" title="Personal" subtitle={mobile} />
                            <DetailListItem icon="smartphone" title="Personal" subtitle={mobile} />
                            <DetailListItem icon="smartphone" title="Personal" subtitle={mobile} />
                        </View>
                    </ScrollView>
                </Content>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.footerBtn} onPress={() => {
                        navigate("EditDetail", {avatar, name, email, mobile})
                    }}>
                        <Icon
                            iconStyle={styles.icon}
                            name={"edit"}
                        />
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

ViewContactApp.propTypes = {
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
    footer: {
        position: "absolute",
        bottom: 0,
        right: 0,
    },
    footerBtn: {
        ...SpacingStyle.mx3,
        ...SpacingStyle.my3,
        ...SpacingStyle.px3,
        ...SpacingStyle.py3,
        ...BackgroundStyle.primary,
        ...BorderStyle.shadow3,
        borderRadius: 45
    },
    icon: {
        ...TextStyle.white,

    }
});
