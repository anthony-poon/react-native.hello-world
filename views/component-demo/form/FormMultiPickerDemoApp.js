import React from "react";
import { StyleSheet, Alert } from "react-native";
import {Container, Content, Form} from "native-base";
import FormContainer from "../../../shares/components/form/FormContainer";
import ListGroup from "../../../shares/components/list/ListGroup";
import {LoremIpsum} from "lorem-ipsum";
import FormMultiPicker from "../../../shares/components/form/FormMultiPicker";

export default class FormMultiPickerDemoApp extends React.Component {
    static navigationOptions = ({ navigation: { navigate } }) => ({
        title: 'Multi Picker Demo',
    });

    state = {
        options1: [],
        options2: [],
        options3: [],
        options4: [],
        value1: [],
        value2: [],
        value3: [],
        value4: [],
    };

    componentDidMount() {
        const lorem = new LoremIpsum();
        const options1 = [];
        const options2 = [];
        const options3 = [];
        const options4 = [];
        for (let i = 0; i < 8; i++) {
            options1.push(lorem.generateWords(3));
        }
        for (let i = 0; i < 100; i++) {
            options2.push(lorem.generateWords(3));
        }
        for (let i = 0; i < 8; i++) {
            options3.push(i);
        }
        for (let i = 0; i < 8; i++) {
            options4.push({
                label: lorem.generateWords(2),
                value: i
            });
        }
        const value1 = Array.from(new Array(2), () => options1[Math.floor(Math.random() * options1.length)]);
        const value2 = Array.from(new Array(10), () => options2[Math.floor(Math.random() * options2.length)]);
        const value3 = Array.from(new Array(2), () => options3[Math.floor(Math.random() * options3.length)]);
        const value4 = Array.from(new Array(2), () => options4[Math.floor(Math.random() * options4.length)].value);
        this.setState({
            options1,
            options2,
            options3,
            options4,
            value1,
            value2,
            value3,
            value4
        })
    }

    render() {
        const {
            options1,
            options2,
            options3,
            options4,
            value1,
            value2,
            value3,
            value4
        } = this.state;
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <FormContainer>
                        <Form style={styles.form}>
                            <ListGroup title={"General"}>
                                <FormMultiPicker label={"Short List"} options={options1} value={value1} onChange={value1 => this.setState({value1})}/>
                                <FormMultiPicker label={"Long List"} options={options2} value={value2} search={true} onChange={value2 => this.setState({value2})}/>
                                <FormMultiPicker label={"Integer Value"} options={options3} value={value3} onChange={value3 => this.setState({value3})}/>
                                <FormMultiPicker last label={"Label Value Pair"} options={options4} value={value4} onChange={value4 => this.setState({value4})}/>
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
