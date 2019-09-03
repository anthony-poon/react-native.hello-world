import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {SpacingStyle} from "../../shares/styles";
import PropTypes from "prop-types";
import avatarPlaceHolder from "../../assets/images/empty-avatar.jpg";
import FormContainer from "../../shares/components/form/FormContainer";
import {Container, Content, Form, Label, Input, Item, Text, Button} from "native-base";
import FormGroup from "../../shares/components/form/FormGroup";
import FormTouchable from "../../shares/components/form/FormTouchable";

export default class EditContactApp extends React.Component {
    static navigationOptions = ({ navigation: { state: { params } } }) => {
        return {
            title: "Edit",
            headerRight: (
                <Button
                    transparent
                    onPress={() => console.log("abc")}
                >
                    <TouchableOpacity>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </Button>
            )
        };
    };

    state = {
        name: "",
        email: "",
        mobile: "",
        avatar: null
    };

    componentDidMount() {
        const {avatar, name, email, mobile} = this.props.navigation.state.params;
        this.setState({
            name,
            email,
            mobile,
            avatar
        })
    }

    render() {
        const navigate = this.props.navigation.navigate;
        const {avatar, name, email, mobile} = this.state;
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <FormContainer>
                        <Form>
                            <FormGroup>
                                <View style={styles.avatarWrapper}>
                                    <TouchableOpacity disabled={true} style={styles.avatar}>
                                        <Image
                                            source={!!avatar ? avatar : avatarPlaceHolder}
                                            style={styles.avatar}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </FormGroup>
                            <FormGroup>
                                <Item fixedLabel>
                                    <Label>Name</Label>
                                    <Input value={name} onChangeText={name => this.setState({name})}/>
                                </Item>
                                <Item fixedLabel>
                                    <Label>Email</Label>
                                    <Input value={email} onChangeText={name => this.setState({email})}/>
                                </Item>
                                <Item fixedLabel last>
                                    <Label>Mobile</Label>
                                    <Input value={mobile} onChangeText={name => this.setState({mobile})}/>
                                </Item>
                            </FormGroup>
                            <FormGroup>
                                <Item last>
                                    <FormTouchable title={"Delete"} type={"danger"}/>
                                </Item>
                            </FormGroup>
                        </Form>
                    </FormContainer>
                </Content>
            </Container>

        );
    }
}

EditContactApp.propTypes = {
    navigation: PropTypes.shape({
        state: PropTypes.shape({
            params: PropTypes.shape({
                avatar: PropTypes.any,
                email: PropTypes.string,
                mobile: PropTypes.string,
                name: PropTypes.string,
            }).isRequired
        }).isRequired
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarWrapper: {
        ...SpacingStyle.my4,
        alignItems: "center",
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: 'white',
        borderWidth: 2,
    }
});
