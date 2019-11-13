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

export default class FormPicker extends React.Component {
    state = {
        isModalVisible: false,
        searchValue: ""
    };

    handleModalOpen() {
        // TODO: Scroll to selected item on open?
        this.setState({
            searchValue: "",
            isModalVisible: true
        })
    }

    handleModalClose() {
        this.setState({
            isModalVisible: false
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

    toFlatListData(options) {
        const rtn = [];
        const {
            searchValue
        } = this.state;
        options.forEach((option, index) => {
            const label = _.isPlainObject(option) ? option.label : option;
            const value = _.isPlainObject(option) ? option.value : option;
            if (!searchValue || label.toLowerCase().includes(searchValue.toLowerCase())) {
                rtn.push({
                    label,
                    value,
                    key: index
                });
            }
        });
        return rtn;
    }

    renderModalContent({item, index, separators}) {
        const {
            value,
        } = this.props;
        const isChecked = item.value === value;
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
            options,
            search,
            placeholder
        } = this.props;
        const {
            isModalVisible,
            searchValue
        } = this.state;
        const formattedOptions = this.toFlatListData(options);
        const selection = _.find(formattedOptions, {value: value});
        // Pick first and check if is object. If true return the options.label
        const subLabel = !selection ? placeholder : selection.label;
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
                                Cancel
                            </TextButton>
                        </View>
                    </View>
                </Modal>
            </>
        );
    }
}

FormPicker.defaultProps = {
    last: false,
    value: "",
    placeholder: "Please select one",
    search: false
};

FormPicker.propTypes = {
    last: PropTypes.bool,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    search: PropTypes.bool,
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