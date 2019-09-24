import React from "react"
import PropTypes from "prop-types";
import {TextInput, View, StyleSheet, Picker} from "react-native";
import FormRedirection from "./FormRedirection";
import {Text} from "native-base";
import Modal from "react-native-modal";
import {BackgroundStyle, SpacingStyle, TextStyle} from "../../styles";
import _ from "lodash";

export default class FormPicker extends React.Component {
    state = {
        isModalVisible: false,
    };

    handleModalOpen() {
        this.setState({
            isModalVisible: true
        })
    }

    handleValueChange(value) {
        const {
            onValueChange
        } = this.props;
        this.setState({
            isModalVisible: false
        }, () => {
            onValueChange(value)
        })
    }

    render() {
        const {
            label,
            value,
            options
        } = this.props;
        const {
            isModalVisible
        } = this.state;
        // Pick first and check if is object. If true return the options.label
        const subLabel = _.isPlainObject(options[0]) ? _.find(options, {value: value}).label : value;
        return (
            <>
                <FormRedirection
                    label={label}
                    subLabel={`${subLabel}`}
                    onPress={() => this.handleModalOpen()}
                />
                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalLabel}>{label}:</Text>
                            <Picker
                                selectedValue={value}
                                onValueChange={value => this.handleValueChange(value)}
                            >
                                {
                                    options.map((option, index) => {
                                        if (_.isPlainObject(option)) {
                                            return (
                                                <Picker.Item label={option.label} value={option.value} key={index}/>
                                            )
                                        } else {
                                            return (
                                                <Picker.Item label={`${option}`} value={option} key={index}/>
                                            )
                                        }
                                    })
                                }
                            </Picker>
                        </View>
                    </View>
                </Modal>
            </>
        );
    }
}

FormPicker.defaultProps = {
    value: ""
};

FormPicker.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        // Options can be just value or object with label and value
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
    ])).isRequired,
    onValueChange: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
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
    }
});