import React from "react"
import PropTypes from "prop-types";
import {View, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput} from "react-native";
import FormRedirection from "./FormRedirection";
import {Text} from "native-base";
import Modal from "react-native-modal";
import {BackgroundStyle, BorderStyle, SpacingStyle, TextStyle} from "../../styles";
import _ from "lodash";
import ListItem from "../list/ListItem";
import TextButton from "../button/TextButton";
import {Ionicons as Icon} from "@expo/vector-icons";
import { SearchBar } from 'react-native-elements';

const MAX_SUBLABEL_LENGTH = 50;

export default class FormMultiPicker extends React.Component {
    state = {
        formattedOptions: [],
        isModalVisible: false,
        searchValue: ""
    };

    // Picker do not need DerivedStateFromProps because options and selection is not stored in state.
    // The selection of Picker is returned immediately (right after click and modal close)
    // MultiPicker need to store selected value and call onValueChange after modal close, thus MultiPicker need states
    // The options state is based on Props value, but need enrichment, thus getDerivedStateFromProps
    static getDerivedStateFromProps(props, state) {
        const {
            options,
            value: selectValues
        } = props;
        const formattedOptions = options.map((option, index) => {
            const label = _.isPlainObject(option) ? option.label : option;
            const value = _.isPlainObject(option) ? option.value : option;
            return {
                label,
                value,
                key: index,
                isSelected: selectValues.includes(value)
            };
        });
        return {
            ...state,
            formattedOptions
        }
    }

    handleModalOpen() {
        // TODO: Scroll to selected item on open?
        this.setState({
            searchValue: "",
            isModalVisible: true
        })
    }

    handleModalClose() {
        const {
            onFinish
        } = this.props;
        this.setState({
            isModalVisible: false
        }, onFinish);
    }

    handleValueChange(newValue) {
        const {
            onValueChange,
            value: originalArray
        } = this.props;
        const newArray = _.xor(originalArray, [newValue]);
        onValueChange(newArray);
    }



    renderModalContent({item, index, separators}) {
        const {
            value,
        } = this.props;
        const isChecked = value.includes(item.value);
        return (
            <ListItem>
                <TouchableOpacity style={styles.optionItemContainer} onPress={() => this.handleValueChange(item.value)}>
                    <Text>{item.label}</Text>
                    {
                        <Icon style={isChecked ? styles.optionItemIconChecked : styles.optionItemIconUnchecked } name={isChecked ? "md-radio-button-on" : "md-radio-button-off"}/>
                    }
                </TouchableOpacity>
            </ListItem>
        )
    }

    render() {
        const {
            last,
            label,
            value,
            search,
            placeholder
        } = this.props;
        const {
            formattedOptions
        } = this.state;
        const {
            isModalVisible,
            searchValue
        } = this.state;
        // Get all selected options first
        const selections = _.filter(formattedOptions, option => value.includes(option.value));
        // Get the string representation of select value and join into a string
        let subLabel = !selections ? placeholder : selections.map(s => s.value).join(", ");
        // Abbreviate it if too long
        if (subLabel.length > MAX_SUBLABEL_LENGTH) {
            subLabel = subLabel.slice(0, MAX_SUBLABEL_LENGTH) + "...";
        }
        return (
            <>
                <FormRedirection
                    last={last}
                    label={label}
                    subLabel={`${subLabel}`}
                    onPress={() => this.handleModalOpen()}
                />
                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={() => this.handleModalClose()}
                >
                    <View style={styles.modalContainer}>
                        <ListItem>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalLabel}>{label}</Text>
                                {
                                    !!search && (
                                        <SearchBar
                                            lightTheme={true}
                                            containerStyle={styles.searchContainer}
                                            inputContainerStyle={styles.searchInput}
                                            onChangeText={searchValue => this.setState({searchValue})}
                                            value={searchValue}
                                        />
                                    )
                                }
                            </View>
                        </ListItem>
                        <FlatList
                            data={formattedOptions}
                            renderItem={args => this.renderModalContent(args)}
                            keyExtractor={(item, index) => `${index}`}
                        />
                        <View style={styles.modalFooter}>
                            <TextButton type={"primary"} onPress={() => this.handleModalClose()}>
                                Close
                            </TextButton>
                        </View>
                    </View>
                </Modal>
            </>
        );
    }
}

FormMultiPicker.defaultProps = {
    last: false,
    value: "",
    placeholder: "Please select one",
    search: false
};

FormMultiPicker.propTypes = {
    last: PropTypes.bool,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    search: PropTypes.bool,
    value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        // Options can be just value or object with label and value
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
    ])).isRequired,
    onValueChange: PropTypes.func.isRequired,
    onFinish: PropTypes.func
};

const styles = StyleSheet.create({
    modalContainer: {
        ...BackgroundStyle.white,
        ...SpacingStyle.my5
    },
    modalContent: {
        ...SpacingStyle.px3
    },
    modalHeader: {
        ...SpacingStyle.py2,
        flexDirection: "row",
        alignItems: "center"
    },
    searchContainer: {
        ...SpacingStyle.ml3,
        ...SpacingStyle.px0,
        ...SpacingStyle.py0,
        ...BackgroundStyle.light,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderRadius: 25,
        flexGrow: 1,
    },
    searchInput: {
        ...BackgroundStyle.light,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderRadius: 15,
    },
    filter: {
        flexShrink: 1,
        borderColor: "red",
        borderWidth: 1
    },
    modalFooter: {
        ...SpacingStyle.px2,
        ...SpacingStyle.py2,
    },
    modalLabel: {
        ...TextStyle.secondary,
    },
    optionItemContainer: {
        ...SpacingStyle.py3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    optionItemIconChecked: {
        ...TextStyle.primary,
        ...TextStyle.lg
    },
    optionItemIconUnchecked: {
        ...TextStyle.secondary,
        ...TextStyle.lg
    }
});