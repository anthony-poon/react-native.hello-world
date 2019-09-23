import React from "react"
import {StyleSheet, View, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import TextButton from "../../../../shares/components/button/TextButton";
import {Ionicons as Icon} from "@expo/vector-icons";
import {BackgroundStyle, SpacingStyle, TextStyle} from "../../../../shares/styles";

export default class MultiSelectBar extends React.Component {
    render() {
        const {
            isAllSelected,
            onToggle,
            onCancel
        } = this.props;
        return (
            <View style={styles.container}>
                <TextButton type={"primary"} onPress={onCancel}>
                    Cancel
                </TextButton>
                <TextButton type={"primary"} onPress={() => onToggle(!isAllSelected)}>
                    {isAllSelected ? "Deselect All": "Select All"}
                </TextButton>
            </View>
        );
    }
}

MultiSelectBar.defaultProps = {
    isAllSelected: false
};

MultiSelectBar.propTypes = {
    isAllSelected: PropTypes.bool,
    onCancel: PropTypes.func,
    onToggle: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        ...BackgroundStyle.light,
        ...SpacingStyle.py1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
    },
    iconSelected: {
        ...TextStyle.lg,
        ...TextStyle.primary,
        ...SpacingStyle.mr4
    },
    iconNotSelected: {
        ...TextStyle.lg,
        ...TextStyle.secondary,
        ...SpacingStyle.mr4
    }
});