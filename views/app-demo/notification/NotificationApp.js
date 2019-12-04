import React from "react"
import {StyleSheet, Platform} from 'react-native';
import {Container, Content} from "native-base";
import _ from "lodash";
import MultiSelectBar from "./components/MultiSelectBar";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import LoaderView from "../../../shares/components/LoaderView";
import FormContainer from "../../../shares/components/form/FormContainer";
import ListGroup from "../../../shares/components/list/ListGroup";
import FormTextInput from "../../../shares/components/form/FormTextInput";
import ENV from "../../../shares/env";
import FormRedirection from "../../../shares/components/form/FormRedirection";
import * as WebBrowser from 'expo-web-browser';

export default class NotificationApp extends React.Component{
    static navigationOptions = ({ navigation: { state: { params } } }) => {
        return {
            title: "Notification",
        };
    };

    state = {
        isLoading: true,
        isError: false,
        isSelectMode: false,
        token: null,
        message: null,
        delay: "Now",
        notifications: [],
    };

    handleSelectAll(bool) {
        const copy = [...this.state.notifications];
        copy.forEach((notification, index) => {
            notification.isSelected = bool;
            return notification;
        });
        this.setState({
            notifications: copy,
            isSelectMode: true
        })
    }

    async _initToken() {

        if (Platform.OS === 'android') {
            await Notifications.createChannelAndroidAsync('notification-app', {
                name: 'Notification App',
                description: "testing",
                vibrate: true,
                sound: true,
            });
        }

        // Check current permission, if not granted, prompt for permission, upload the token
        let { status: status } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        console.log('Initial status: ' + status);
        if (status !== 'granted') {
            // iOS only, In android it is asked during installation
            status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        console.log('End status: ' + status);
        // Skip if user did not grant permission even if asked
        // Push the push token to server
        if (status === 'granted') {
            await Notifications.presentLocalNotificationAsync({
                title: 'Local Notification',
                body: 'This is a message send locally',
                android: {
                    channelId: 'notification-app',
                },
            });
            try {
                const token = await Notifications.getExpoPushTokenAsync();
                //await Messenger.registerToken(token);
                this.setState({
                    token,
                    isLoading: false
                })
            } catch (e) {
                console.error(e);
            }

        }
    }

    async componentDidMount() {
        await this._initToken();
    }

    renderSelectBar() {
        const {
            isSelectMode,
            notifications
        } = this.state;
        if (isSelectMode) {
            const isAllSelected = _.every(notifications, {isSelected: true});
            return (
                <MultiSelectBar
                    isAllSelected={isAllSelected}
                    onCancel={() => {
                        this.setState({
                            isSelectMode: false
                        })
                    }}
                    onToggle={bool => this.handleSelectAll(bool)}
                />
            )
        }
    }

    async handleRedirect() {
        const {
            token
        } = this.state;
        const url = ENV.END_POINT_URL;
        console.log(url);
        await WebBrowser.openBrowserAsync(url  + `/views/notifications/${encodeURIComponent(token)}`);
    }

    render() {
        const {
            isSelectMode,
            isError,
            isLoading,
            token
        } = this.state;
        return (
            <Container>
                {
                    !!isSelectMode && this.renderSelectBar()
                }
                <Content contentContainerStyle={styles.container}>
                    <LoaderView isLoading={isLoading} isError={isError}>
                        <FormContainer>
                            <ListGroup>
                                <FormTextInput last label={"Your Device Token"} value={token} disabled/>
                            </ListGroup>
                            <ListGroup>
                                <FormRedirection last label={"Send Notification"} onPress={() => this.handleRedirect()}/>
                            </ListGroup>
                        </FormContainer>
                    </LoaderView>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
});