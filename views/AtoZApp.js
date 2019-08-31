import {View} from "react-native";
import AtoZList from "../shares/components/AtoZList";
import React from "react";
import { LoremIpsum } from "lorem-ipsum";
import {Container, Content} from "native-base"
export default class AtoZApp extends React.Component {
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
        return (
            <Container>
                <Content contentContainerStyle={{ height: "100%" }}>
                    <View style={{height: "100%"}}>
                        <AtoZList
                            data={this.state.data}
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
