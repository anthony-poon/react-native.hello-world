import React from "react";
import {Text, TouchableOpacity, StyleSheet, View} from "react-native";
import {Container, Content} from "native-base";
import Modal from "react-native-modal";
import {BackgroundStyle} from "../../shares/styles";

export default class ModalApp extends React.Component {
    state = {
        isModalVisible: false
    }
    render() {
        return (
            <Container>
                <Content>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            isModalVisible: true
                        })
                    }}>
                        <Text>Open</Text>
                    </TouchableOpacity>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={styles.modal}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    isModalVisible: false
                                })
                            }}>
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        ...BackgroundStyle.white,
    },
    container: {
        flexGrow: 1,
    }
})