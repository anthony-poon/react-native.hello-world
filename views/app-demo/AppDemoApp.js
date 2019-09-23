import React from "react";
import {Container, Content} from "native-base";
import FormContainer from "../../shares/components/form/FormContainer";
import ListGroup from "../../shares/components/list/ListGroup";
import FormRedirection from "../../shares/components/form/FormRedirection";
import {StyleSheet} from "react-native";

export default class AppDemoApp extends React.Component{
    static navigationOptions = ({ navigation: { navigate } }) => ({
        title: 'App Demo',
    });
    render() {
        const {
            navigation
        } = this.props;
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <FormContainer>
                        <ListGroup>
                            <FormRedirection label={"Contact List"} subLabel={"Simulating a contact list"} onPress={() => {
                                navigation.navigate('ContactList');
                            }}/>
                            <FormRedirection label={"Notification"} subLabel={"Simulating a notification list"} onPress={() => {
                                navigation.navigate('Notification');
                            }}/>
                        </ListGroup>
                    </FormContainer>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    }
});
