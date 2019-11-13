import React from "react"
import {StyleSheet, TouchableOpacity, View, TextInput} from "react-native"
import PropTypes from "prop-types";
import {BackgroundStyle, BorderStyle, SpacingStyle, TextStyle} from "../../styles";
import Modal from "react-native-modal"
import {Button, Text} from "native-base";
import TextButton from "../button/TextButton";
import {FontAwesome as Icon} from "@expo/vector-icons";
import ListItem from "../list/ListItem";

export default class FormTextInput extends React.Component {
    state = {
        isModalVisible: false,
        modalValue: ""
    };

    handleInput(value) {
        this.setState({
            modalValue: value
        })
    }

    handleSubmit() {
        this.setState({
            isModalVisible: false,
        }, () => {
            const {
                onChange
            } = this.props;
            const {
                modalValue
            } = this.state;
            onChange(modalValue);
        })
    }

    handleModalOpen() {
        const {
            value,
            disabled
        } = this.props;
        if (!disabled) {
            this.setState({
                isModalVisible: true,
                modalValue: value
            })
        }
    }

    handleModalClose() {
        const {
            disabled
        } = this.props;
        if (!disabled) {
            this.setState({
                isModalVisible: false,
                modalValue: ""
            })
        }
    }

    render() {
        const {
            isModalVisible,
            modalValue
        } = this.state;
        const {
            label,
            value,
            last,
            disabled,
            keyboardType,
            indent,
            icon,
            onChange,
            ...rest
        } = this.props;
        const editable = !disabled && !!onChange;
        return (
            <>
                <ListItem last={last}>
                    <TouchableOpacity {...rest} style={styles.container} disabled={!editable} onPress={this.handleModalOpen.bind(this)}>
                        {
                            !!icon && (
                                <View style={styles.lhs}>
                                    <Icon size={16} name={icon}/>
                                </View>

                            )
                        }
                        {
                            !icon && indent && (
                                <View style={styles.indent}/>
                            )
                        }
                        <View style={styles.content}>
                            <Text style={[
                                styles.label,
                                disabled && styles.labelDisabled
                            ]}>{label}</Text>
                            {
                                !!value && (
                                    <Text style={styles.value}>{value}</Text>
                                )
                            }
                        </View>
                        {
                            !!editable && (
                                <Icon
                                    name={"edit"}
                                    size={16}
                                    style={styles.rhs}
                                />
                            )
                        }

                    </TouchableOpacity>
                    <Modal
                        isVisible={isModalVisible}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalLabel}>{label}:</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    keyboardType={keyboardType}
                                    value={modalValue}
                                    onChangeText={this.handleInput.bind(this)}
                                    onSubmitEditing={this.handleSubmit.bind(this)}
                                />
                            </View>
                            <View style={styles.modalButtonsWrapper}>
                                {/*TODO: Fix keyboard out focus event not propagate to the button */}
                                <TextButton type={"primary"} onPress={this.handleModalClose.bind(this)}>
                                    Cancel
                                </TextButton>
                                <TextButton type={"primary"} onPress={this.handleSubmit.bind(this)}>
                                    Submit
                                </TextButton>
                            </View>
                        </View>
                    </Modal>
                </ListItem>
            </>
        );
    }
}

FormTextInput.defaultProps = {
    value: "",
    last: false,
    keyboardType: "default",
    disabled: false,
    indent: false
};

FormTextInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    last: PropTypes.bool,
    disabled: PropTypes.bool,
    keyboardType: PropTypes.string,
    onChange: PropTypes.func,
    indent: PropTypes.bool,
    // TODO: Improve icon rendering
    icon: PropTypes.string
};


const styles = StyleSheet.create({
    container: {
        ...SpacingStyle.py3,
        flexDirection: "row",
        flexGrow: 1,
        alignItems: "center",
    },
    lhs: {
        ...SpacingStyle.mr3,
        ...SpacingStyle.mt1,
        alignSelf: "flex-start",
        height: 16,
        width: 16,
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible"
    },
    indent: {
        ...SpacingStyle.mr3,
        ...SpacingStyle.px2,
    },
    content: {
        ...SpacingStyle.pr2,
        flexGrow: 1,
        flexShrink: 1,
    },
    label: {
        ...TextStyle.lg,
        flexShrink: 1
    },
    labelDisabled: {
        ...TextStyle.muted,
    },
    value: {
        ...TextStyle.sm,
        ...TextStyle.secondary,
        flexShrink: 1
    },
    rhs: {
        ...TextStyle.secondary,
        ...SpacingStyle.mr3,
    },
    modalContainer: {
        ...BackgroundStyle.white,
        ...SpacingStyle.pt4,
        ...SpacingStyle.pb3,
        ...SpacingStyle.px2
    },
    modalContent: {
        ...SpacingStyle.px3
    },
    modalLabel: {
        ...TextStyle.sm,
        ...TextStyle.secondary,
    },
    modalInput: {
        ...SpacingStyle.mt2,
        ...SpacingStyle.mb3,
        ...TextStyle.lg,
        ...BorderStyle.borderBottom,
    },
    modalButtonsWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
});