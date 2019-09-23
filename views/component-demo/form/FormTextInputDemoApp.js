import React from "react";
import { StyleSheet } from "react-native";
import {Container, Content, Form} from "native-base";
import FormContainer from "../../../shares/components/form/FormContainer";
import ListGroup from "../../../shares/components/list/ListGroup";
import FormTextInput from "../../../shares/components/form/FormTextInput";

export default class FormTextInputDemoApp extends React.Component {
    static navigationOptions = ({ navigation: { navigate } }) => ({
        title: 'Text Input Demo',
    });

    state = {
        name: "John Doe",
        email: "john.doe@example.com",
        textInput1: "Some Text Value",
        multiline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    };

    render() {
        const {
            name,
            email,
            textInput1,
            multiline,
        } = this.state;
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <FormContainer>
                        <Form style={styles.form}>
                            <ListGroup title={"General"}>
                                <FormTextInput label={"Name"} value={name} onChange={name => this.setState({name: name})}/>
                                <FormTextInput last label={"Email"} value={email} onChange={email => this.setState({email: email})}/>
                            </ListGroup>
                            <ListGroup title={"Demo"}>
                                <FormTextInput disabled={true} value={"Label will be grayed out"} label={"Disabled"}/>
                                <FormTextInput label={"Read Only"} value={"If no onChange function provided, it will act as if disabled, but the label style will remain the same"}/>
                                <FormTextInput label={"Label Only"}/>
                                <FormTextInput last label={"Multiline"} value={multiline} onChange={multiline => this.setState({multiline})}/>
                            </ListGroup>
                            <ListGroup title={"Iconable"}>
                                <FormTextInput icon={"facebook"} label={"Icon"}/>
                                <FormTextInput icon={"facebook"} label={"With Value"} value={textInput1} onChange={textInput1 => this.setState(textInput1)}/>
                                <FormTextInput indent label={"Indentation"}/>
                                <FormTextInput icon={"glass"} last label={"Multiline with icon"} value={multiline} onChange={multiline => this.setState({multiline})}/>
                            </ListGroup>
                        </Form>
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
