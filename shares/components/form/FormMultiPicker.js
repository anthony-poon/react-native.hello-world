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
        isModalVisible: false,
        searchValue: "",
        formattedOptions: [],
    };

    handleModalOpen() {
        // TODO: Scroll to selected item on open?
        const {
            options,
            value: selections
        } = this.props;
        const formattedOptions = options.map((option, index) => {
            const label = _.isPlainObject(option) ? option.label : option;
            const value = _.isPlainObject(option) ? option.value : option;
            return {
                label,
                value,
                key: index,
                isSelected: selections.includes(value)
            }
        });
        this.setState({
            searchValue: "",
            isModalVisible: true,
            formattedOptions
        })
    }

    handleModalClose() {
        const {
            onValueChange
        } = this.props;
        const {
            formattedOptions
        } = this.state;
        this.setState({
            isModalVisible: false
        }, () => {
            onValueChange(_.filter(formattedOptions, option => option.isSelected).map(selection => selection.value));
        });
    }

    handleToggle(index) {
        const {
            formattedOptions
        } = this.state;
        const copy = [...formattedOptions];
        copy[index].isSelected = !copy[index].isSelected;
        this.setState({
            formattedOptions: copy
        })
    }

    renderModalContent({item, index, separators}) {
        return (
            <ListItem>
                <TouchableOpacity style={styles.optionItemContainer} onPress={() => this.handleToggle(index)}>
                    <Text>{item.label}</Text>
                    {
                        <Icon style={item.isSelected ? styles.optionItemIconChecked : styles.optionItemIconUnchecked } name={item.isSelected ? "md-radio-button-on" : "md-radio-button-off"}/>
                    }
                </TouchableOpacity>
            </ListItem>
        )
    }

    resolveSubLabel() {
        const {
            options,
            placeholder,
            value: selections
        } = this.props;
        // option can be array int, string or obj
        const filtered = _.filter(options, option => {
            if (_.isPlainObject(option) && selections.includes(option.value)) {
                return selections.includes(option.value);
            } else if (selections.includes(option)) {
                return selections.includes(option);
            }
        });
        // Abbreviate it if too long
        const subLabel = filtered.join(", ");
        if (!subLabel) {
            return placeholder;
        } else if (subLabel.length > MAX_SUBLABEL_LENGTH) {
            return subLabel.slice(0, MAX_SUBLABEL_LENGTH) + "...";
        }
        return subLabel;
    }

    render() {
        const {
            last,
            label,
            search,
        } = this.props;
        const {
            isModalVisible,
            searchValue,
            formattedOptions,
        } = this.state;
        return (
            <>
                <FormRedirection
                    last={last}
                    label={label}
                    subLabel={`${ this.resolveSubLabel() }`}
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