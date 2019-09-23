import React from "react";
import {Container, Content, Form} from "native-base";
import FormContainer from "../../../shares/components/form/FormContainer";
import ListGroup from "../../../shares/components/list/ListGroup";
import FormTextInput from "../../../shares/components/form/FormTextInput";
import {StyleSheet} from "react-native";
import FormToggle from "../../../shares/components/form/FormToggle";

export default class FormToggleDemoApp extends React.Component {
    static navigationOptions = ({ navigation: { navigate } }) => ({
        title: 'Toggle Demo',
    });

    state = {
        value1: true,
        value2: false,
        value3: true,
        value4: true,
        value5: false,
        value6: true,
        value7: true,
        value8: true,
        value9: true,
    };

    render() {
        const {
            value1,
            value2,
            value3,
            value4,
            value5,
            value6,
            value7,
            value8,
            value9
        } = this.state;
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <FormContainer>
                        <Form style={styles.form}>
                            <ListGroup title={"Themed color"}>
                                <FormToggle label={"Base"} value={value1} onValueChange={value1 => this.setState({value1})}/>
                                <FormToggle label={"With sub-label"} subLabel={"You can insert sub-label here"} value={value2} onValueChange={value2 => this.setState({value2})}/>
                                <FormToggle label={"Multi-line"} subLabel={
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ullamcorper porttitor ligula at commodo. Nulla sit amet ex vel ligula convallis aliquam quis dapibus nibh. Fusce lacinia dignissim nisi vel fringilla. Nam nec rutrum est. Phasellus bibendum, tortor quis pretium tincidunt, arcu sem pharetra nibh, a blandit erat magna in lectus. Sed bibendum elit sit amet posuere maximus. Mauris euismod bibendum lobortis. Sed cursus, turpis ac venenatis maximus, tortor diam mattis ligula, fringilla rhoncus nulla neque in mauris. Suspendisse euismod nibh eu imperdiet vehicula. Maecenas ac luctus metus. Donec ullamcorper velit ac ullamcorper efficitur. Donec feugiat, justo eu efficitur posuere, arcu justo maximus massa, in tempus odio felis sollicitudin ex."
                                } value={value3} onValueChange={value3 => this.setState({value3})}/>
                                <FormToggle last label={"Disabled"} value={value4} disabled={true} onValueChange={value4 => this.setState({value4})}/>
                            </ListGroup>
                            <ListGroup title={"Themed color"}>
                                <FormToggle label={"Themed Color"} value={value5} subLabel={"Can use themed color, but might not be a good idea if the theme color is red, grey or etc."} useThemedColor={true} onValueChange={value5 => this.setState({value5})}/>
                                <FormToggle last label={"Disabled"} value={value6} disabled={true} useThemedColor={true} onValueChange={value6 => this.setState({value6})}/>
                            </ListGroup>
                            <ListGroup title={"Iconable"}>
                                <FormToggle icon={"facebook"} label={"Base"} value={value7} onValueChange={value7 => this.setState({value7})}/>
                                <FormToggle indent label={"Indentation"} value={value8} onValueChange={value8 => this.setState({value8})}/>
                                <FormToggle icon={"glass"} last label={"Multi-line"} subLabel={
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ullamcorper porttitor ligula at commodo. Nulla sit amet ex vel ligula convallis aliquam quis dapibus nibh. Fusce lacinia dignissim nisi vel fringilla. Nam nec rutrum est. Phasellus bibendum, tortor quis pretium tincidunt, arcu sem pharetra nibh, a blandit erat magna in lectus. Sed bibendum elit sit amet posuere maximus. Mauris euismod bibendum lobortis. Sed cursus, turpis ac venenatis maximus, tortor diam mattis ligula, fringilla rhoncus nulla neque in mauris. Suspendisse euismod nibh eu imperdiet vehicula. Maecenas ac luctus metus. Donec ullamcorper velit ac ullamcorper efficitur. Donec feugiat, justo eu efficitur posuere, arcu justo maximus massa, in tempus odio felis sollicitudin ex."
                                } value={value9} onValueChange={value9 => this.setState({value9})}/>
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
