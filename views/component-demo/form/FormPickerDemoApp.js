import React from "react";
import { StyleSheet, Picker} from "react-native";
import {Container, Content, Form} from "native-base";
import FormContainer from "../../../shares/components/form/FormContainer";
import ListGroup from "../../../shares/components/list/ListGroup";
import FormPicker from "../../../shares/components/form/FormPicker";
import {LoremIpsum} from "lorem-ipsum";

export default class FormPickerDemoApp extends React.Component {
    static navigationOptions = ({ navigation: { navigate } }) => ({
        title: 'Picker Demo',
    });

    state = {
        options1: [],
        options2: [],
        options3: [],
        value1: "",
        value2: "",
        value3: "",
    };

    componentDidMount() {
        const lorem = new LoremIpsum();
        const count = 10;
        const options1 = [];
        const options2 = [];
        const options3 = [];
        for (let i = 0; i < count; i++) {
            options1.push(lorem.generateWords(3));
            options2.push(i);
            options3.push({
                label: lorem.generateWords(2),
                value: i
            });
        }
        const value1 = options1[Math.floor(Math.random() * count)];
        const value2 = options2[Math.floor(Math.random() * count)];
        const value3 = options3[Math.floor(Math.random() * count)].value;
        this.setState({
            options1,
            options2,
            options3,
            value1,
            value2,
            value3
        })
    }

    render() {
        const {
            options1,
            options2,
            options3,
            value1,
            value2,
            value3
        } = this.state;
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <FormContainer>
                        <Form style={styles.form}>
                            <ListGroup title={"General"}>
                                <FormPicker label={"Dropdown 1"} options={options1} value={value1} onValueChange={value1 => this.setState({value1})}/>
                                <FormPicker label={"Dropdown 2"} options={options2} value={value2} onValueChange={value2 => this.setState({value2})}/>
                                <FormPicker label={"Dropdown 3"} options={options3} value={value3} onValueChange={value3 => this.setState({value3})}/>
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
