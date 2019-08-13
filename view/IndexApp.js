import {StatusBar, StyleSheet, Text, View} from "react-native";
import AtoZList from "../share/component/AtoZList";
import React from "react";
import _ from "lodash"
import { LoremIpsum } from "lorem-ipsum";
export default class IndexApp extends React.Component {
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
        })
    }

    render() {
        return (
            <View>
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
                />
            </View>
        );
    }
}
