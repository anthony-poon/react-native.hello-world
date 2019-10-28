import React from "react"
import {StyleSheet, View} from 'react-native';
import {Container, Content} from "native-base";
import {LoremIpsum} from "lorem-ipsum";
import NotificationItem from "./components/NotificationItem";
import moment from "moment";
import _ from "lodash";
import MultiSelectBar from "./components/MultiSelectBar";

export default class NotificationApp extends React.Component{
    static navigationOptions = ({ navigation: { state: { params } } }) => {
        return {
            title: "Notification",
        };
    };

    state = {
        notifications: [],
        isSelectMode: false
    };

    handleEnterSelectMode(selection) {
        const copy = [...this.state.notifications];
        copy.forEach((notification, index) => {
            notification.isSelected = index === selection;
            return notification;
        });
        this.setState({
            notifications: copy,
            isSelectMode: true
        })
    }

    handleSelect(index){
        const copy = [...this.state.notifications];
        copy[index].isSelected = !copy[index].isSelected;
        this.setState({
            notifications: copy
        })
    }

    handleRead(index) {
        const copy = [...this.state.notifications];
        copy[index].isUnread = false;
        this.setState({
            notifications: copy
        })
    }

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

    async componentDidMount() {
        const lorem = new LoremIpsum();
        const notifications = [];
        for (let i = 0; i < 15; i++) {
            const end = parseInt(moment().format("X"));
            const start = parseInt(moment().subtract(1, "month").format("X"));
            const timestamp = moment.unix(Math.floor(Math.random() * (end - start) + start));
            notifications.push({
                avatar: String.fromCharCode(Math.random() * 26 + 65),
                title: lorem.generateWords(2),
                content: lorem.generateWords(Math.floor(Math.random() * 5 + 15)),
                timestamp: timestamp.fromNow(),
                unix: timestamp,
                isUnread: Math.round(Math.random()) === 1,
                isSelected: false
            })
        }
        this.setState({
            notifications: _.sortBy(notifications, "unix").reverse()
        })
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

    render() {
        const {
            notifications,
            isSelectMode,
        } = this.state;
        return (
            <Container>
                {
                    !!isSelectMode && this.renderSelectBar()
                }
                <Content contentContainerStyle={styles.container}>
                    {
                        notifications.map((notification, index) => (
                            <NotificationItem
                                key={index}
                                {...notification}
                                last={index === notifications.length - 1}
                                isSelectMode={isSelectMode}
                                onPress={() => this.handleRead(index)}
                                onLongPress={() => this.handleEnterSelectMode(index)}
                                onSelect={() => this.handleSelect(index)}
                            />
                        ))
                    }
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