import {View, Text, StyleSheet, ScrollView, SectionList} from "react-native";
import React from "react";
import {Container, Content, Grid, Left, Right} from "native-base"
import _ from "lodash";
export default class FlexLab extends React.Component{
    _keyExtractor = (item, index) => item.index;

    _renderItem = ({item}) => (
        <Text>{item}</Text>
    );


    render() {
        const lhs = _.range(100).map(x => `lhs ${x}`);
        const data = [{
            title: "lhs",
            data: lhs
        }];
        return (
            <Container>
                <Content contentContainerStyle={{ height: "100%" }}>
                    <View style={{height: "100%"}}>
                        <View style={styles.topWrapper}>
                            <Text>
                                Top
                            </Text>
                        </View>
                        <View style={styles.bottomWrapper}>
                            <SectionList
                                sections={data}
                                keyExtractor={this._keyExtractor}
                                renderItem={this._renderItem}
                            />
                            <View style={styles.rhs}>
                                <Text>R</Text>
                                <Text>H</Text>
                                <Text>S</Text>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    topWrapper: {
        alignItems: "center",
        backgroundColor: "blue"
    },
    bottomWrapper: {
        flex: 1,
        backgroundColor: "green",
        flexDirection: "row"
    },
    lhs: {
    },
    rhs: {
        backgroundColor: "red"
    }
});