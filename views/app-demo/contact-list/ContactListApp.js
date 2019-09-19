import {View, TouchableHighlight, Text, StyleSheet, TouchableOpacity} from "react-native";
import AtoZList from "./components/AtoZList";
import React from "react";
import { LoremIpsum } from "lorem-ipsum";
import {Container, Content} from "native-base"
import {SpacingStyle, BorderStyle, BackgroundStyle} from "../../../shares/styles"
import avatar from "../../../assets/images/empty-avatar.jpg";

export default class ContactListApp extends React.Component {
    static navigationOptions = ({ navigation: { navigate } }) => ({
        title: 'Contact List',
    });
    state = {
        data: []
    };

    componentDidMount() {
        const lorem = new LoremIpsum();
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push(lorem.generateWords(2));
        }
        this.setState({
            data: data
        });
    }

    render() {
        const { navigation: { navigate } } = this.props;
        return (
            <Container>
                <Content contentContainerStyle={{ height: "100%" }}>
                    <View style={{height: "100%"}}>
                        <AtoZList
                            data={this.state.data}
                            renderItem={({item, index, section}) => (
                                <TouchableOpacity style={styles.listItem} onPress={() => navigate('DisplayDetail', {
                                    avatar: avatar,
                                    name: "John Doe",
                                    email: "john.doe@example.com",
                                    mobile: "+ 852-2000 0000"
                                })}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                            onPartition={data => {
                                const ascii = data.toUpperCase().charCodeAt(0);
                                if (ascii >= 65 && ascii < 91) {
                                    return ascii - 65;
                                } else {
                                    return false;
                                }
                            }}
                            onFilter={(query, data) => {
                                return data.toLowerCase().includes(query.toLowerCase())
                            }}
                        />
                    </View>
                </Content>
            </Container>

        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        ...SpacingStyle.py3,
        ...SpacingStyle.mx2,
        ...BorderStyle.borderBottom,
        ...BackgroundStyle.white,
    }
});