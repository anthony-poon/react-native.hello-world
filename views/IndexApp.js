import {View, Text, StyleSheet} from "react-native";
import React from "react";
import {Container, Content} from "native-base"
export default class IndexApp extends React.Component {
    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <Text>Hello World</Text>
                    </View>
                </Content>
            </Container>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
