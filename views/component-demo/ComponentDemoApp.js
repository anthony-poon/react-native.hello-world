import React from "react";
import { StyleSheet } from "react-native";
import {Container, Content} from "native-base";
import FormContainer from "../../shares/components/form/FormContainer";
import FormGroup from "../../shares/components/form/FormGroup";
import FormRedirection from "../../shares/components/form/FormRedirection";

export default class ComponentDemoApp extends React.Component {
    static navigationOptions = ({ navigation: { navigate } }) => ({
        title: 'Component Demo',
    });
    render() {
        const {
           navigation
        } = this.props;
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <FormContainer>
                        <FormGroup title={"Form Component"}>
                            <FormRedirection label={"Text Input"} subLabel={"Input component for pure text"} onPress={() => {
                                navigation.navigate('FormTextInputDemo');
                            }}/>
                            <FormRedirection label={"Toggle"} subLabel={"Input component for boolean value"} onPress={() => {
                                navigation.navigate('FormToggleDemo');
                            }}/>
                            <FormRedirection label={"Place holder"} onPress={() => {}}/>
                            <FormRedirection last label={"Place holder"} onPress={() => {}}/>
                        </FormGroup>
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
