import React from "react";
import { StyleSheet, Alert } from "react-native";
import {Container, Content, Form} from "native-base";
import FormContainer from "../../../shares/components/form/FormContainer";
import ListGroup from "../../../shares/components/list/ListGroup";
import {LoremIpsum} from "lorem-ipsum";
import FormMultiPicker from "../../../shares/components/form/FormMultiPicker";

export default class FormMultiPickerDemoApp extends React.Component {
    static navigationOptions = ({ navigation: { navigate } }) => ({
        title: 'Picker Demo',
    });

    state = {
        options1: [],
        options2: [],
        value1: [],
        value2: [],
    };

    componentDidMount() {
        const lorem = new LoremIpsum();
        const options1 = [];
        const options2 = [];
        for (let i = 0; i < 100; i++) {
            options1.push(lorem.generateWords(3));
        }
        for (let i = 0; i < 8; i++) {
            options2.push(i);
        }
        const value1 = Array.from(new Array(10), () => options1[Math.floor(Math.random() * options1.length)]);
        const value2 = Array.from(new Array(2), () => options2[Math.floor(Math.random() * options2.length)]);
        this.setState({
            options1,
            options2,
            value1,
            value2,
        })
    }

    render() {
        const {
            options1,
            options2,
            value1,
            value2,
        } = this.state;
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <FormContainer>
                        <Form style={styles.form}>
                            <ListGroup title={"General"}>
                                <FormMultiPicker label={"Likes Picker, but allow multiple"} last options={options1} value={value1} search={true} onValueChange={value1 => this.setState({value1})}/>
                            </ListGroup>
                            <ListGroup title={"Callback"}>
                                <FormMultiPicker label={"Call back after closing"} last options={options2} value={value2} onValueChange={value2 => this.setState({value2})} onFinish={() => Alert.alert("Call Back", "You have selected: " + value2.join(", "))}/>
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
