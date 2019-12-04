import React from "react";
import {View, StyleSheet, ActivityIndicator, Platform} from "react-native";
import PropTypes from "prop-types";
import {MaterialIcons as Icon} from "@expo/vector-icons";
import {COLOR_PRIMARY} from "../styles/var";

export default class LoaderView extends React.Component {
    render() {
        const {
            isError,
            isLoading,
            children,
            ...rest
        } = this.props;
        return (
            <View {...rest} style={styles.container}>
                {
                    isError && (
                        <Icon
                            name={"error-outline"}
                        />
                    )
                }
                {
                    !isError && isLoading && (
                        <ActivityIndicator size={Platform.OS === "android" ? 36 : 1} color={COLOR_PRIMARY}/>
                    )
                }
                {
                    !isError && !isLoading && children
                }
            </View>
        );
    }
}

LoaderView.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
    }
});