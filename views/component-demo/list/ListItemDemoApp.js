import React from "react";
import {Text, View} from "react-native";
import {Container, Content} from "native-base";
import {LoremIpsum} from "lorem-ipsum";
import ListItem from "../../../shares/components/list/ListItem";
import PropTypes from "prop-types";
import {BackgroundStyle, SpacingStyle, TextStyle} from "../../../shares/styles";
import ListGroup from "../../../shares/components/list/ListGroup";

class ListItemImpl1 extends React.Component {
    render() {
        const {
            avatar,
            text,
            subText
        } = this.props;
        return (
            <ListItem>
                <View style={{
                    flexDirection: "row"
                }}>
                    <View style={{
                        ...BackgroundStyle.light,
                        ...SpacingStyle.mr3,
                        height: 48,
                        width: 48,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 50
                    }}>
                        <Text style={{
                            ...TextStyle.lg,
                            ...TextStyle.secondary
                        }}>{avatar}</Text>
                    </View>
                    <View style={{
                        flexShrink: 1
                    }}>
                        <Text style={{
                            ...TextStyle.lg,
                        }}>{text}</Text>
                        <Text style={{
                            ...TextStyle.secondary,
                        }}>{subText}</Text>
                    </View>
                </View>
            </ListItem>
        );
    }
}

ListItemImpl1.propTypes = {
    avatar: PropTypes.string,
    text: PropTypes.string,
    subText: PropTypes.string
};

export default class ListItemDemoApp extends React.Component {
    static navigationOptions = ({ navigation: { navigate } }) => ({
        title: 'List Item Demo',
    });

    state = {
        list1: [],
        list2: [],
    };

    componentDidMount() {
        const lorem = new LoremIpsum();
        const list1 = [];
        const list2 = [];
        const list3 = [];
        for (let i = 0; i < 10; i++) {
            list1.push(lorem.generateWords(2));
            list2.push({
                avatar: String.fromCharCode(Math.random() * 26 + 65),
                text: lorem.generateWords(2),
                subText: lorem.generateParagraphs(1)
            });
            list3.push(lorem.generateWords(2));
        }
        this.setState({
            list1,
            list2,
        });
    }

    render() {
        const {
            list1,
            list2,
        } = this.state;
        return (
            <Container>
                <Content>
                    <ListGroup title={"Default"}>
                    {
                        list1.map((item, index) => (
                            <ListItem key={index} last={index === list1.length - 1}>
                                <Text>{item}</Text>
                            </ListItem>
                        ))
                    }
                    </ListGroup>
                    <ListGroup title={"Styled"}>
                    {
                        list2.map((item, index) => (
                            <ListItemImpl1 key={index} {...item}  last={index === list2.length - 1}/>
                        ))
                    }
                    </ListGroup>
                </Content>
            </Container>
        );
    }
}