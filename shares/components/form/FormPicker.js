import React from "react"
import PropTypes from "prop-types";
import {View, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import FormRedirection from "./FormRedirection";
import {Text} from "native-base";
import Modal from "react-native-modal";
import {BackgroundStyle, SpacingStyle, TextStyle} from "../../styles";
import _ from "lodash";
import ListItem from "../list/ListItem";
import TextButton from "../button/TextButton";
import {Ionicons as Icon} from "@expo/vector-icons";
import { SearchBar } from 'react-native-elements';

const MAX_SUB_LABEL_LENGTH = 50;

export default class FormPicker extends React.Component {
    state = {
        isModalVisible: false,
        searchValue: "",
        formattedOptions: []
    };

    handleModalOpen() {
        const {
            options,
            value: selection
        } = this.props;
        const formattedOptions = options.map((option, index) => {
            const label = _.isPlainObject(option) ? option.label : option;
            const value = _.isPlainObject(option) ? option.value : option;
            return {
                label,
                value,
                key: index,
                isSelected: selection === value,
                isFiltered: false
            }
        });
        this.setState({
            searchValue: "",
            isModalVisible: true,
            formattedOptions
        })
    }

    handleModalClose() {
        this.setState({
            isModalVisible: false
        });
    }

    handleToggle(toggleIndex) {
        const {
            formattedOptions
        } = this.state;
        const {
            onChange
        } = this.props;
        const copy = formattedOptions.map((option, index) => ({
            ...option,
            isSelected: toggleIndex === index
        }));
        this.setState({
            formattedOptions: copy,
            isModalVisible: false
        }, () => {
            const selectedOption = _.find(copy, option => option.isSelected);
            onChange(!!selectedOption ? selectedOption.value : null);
        })
    }

    handleSearchInput(searchValue) {
        const {
            formattedOptions
        } = this.state;
        const copy = formattedOptions.map((option, index) => ({
            ...option,
            isFiltered: !!searchValue && !option.label.toLowerCase().includes(searchValue.toLowerCase())
        }));
        this.setState({
            formattedOptions: copy,
            searchValue
        })
    }

    renderModalContent({item, index, separators}) {
        return (
            !item.isFiltered && (
                <ListItem>
                    <TouchableOpacity style={styles.optionItemContainer} onPress={() => this.handleToggle(index)}>
                        <Text>{item.label}</Text>
                        {
                            <Icon style={item.isSelected ? styles.optionItemIconChecked : styles.optionItemIconUnchecked } name={item.isSelected ? "md-radio-button-on" : "md-radio-button-off"}/>
                        }
                    </TouchableOpacity>
                </ListItem>
            )
        )
    }

    resolveSubLabel() {
        const {
            options,
            placeholder,
            value: selection
        } = this.props;
        // option can be array int, string or obj
        const filtered = _.find(options, option => {
            if (_.isPlainObject(option)) {
                return selection === option.value;
            } else {
                return selection === option;
            }
        });
        // Abbreviate it if too long
        const subLabel = _.isPlainObject(filtered) ? filtered.label : filtered;
        if (filtered === undefined) {
            return placeholder;
        } else if (subLabel.length > MAX_SUB_LABEL_LENGTH) {
            return subLabel.slice(0, MAX_SUB_LABEL_LENGTH) + "...";
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
            formattedOptions
        } = this.state;
        // Pick first and check if is object. If true return the options.label
        return (
            <>
                <FormRedirection
                    last={last}
                    label={label}
                    subLabel={`${this.resolveSubLabel()}`}
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
                                            onChangeText={searchValue => this.handleSearchInput(searchValue)}
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
    onChange: PropTypes.func.isRequired
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
        ...SpacingStyle.py1,
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
        ...SpacingStyle.py3
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