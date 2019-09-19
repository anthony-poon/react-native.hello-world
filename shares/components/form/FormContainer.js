import React from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import {BackgroundStyle} from "../../styles";
import PropTypes from "prop-types"

export default class FormContainer extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <ScrollView style={styles.container}>
                { children }
            </ScrollView>
        );
    }
}

FormContainer.propTypes = {
    children: PropTypes.node
};

const styles = StyleSheet.create({
    container: {
        ...BackgroundStyle.light,
        flex: 1,
    }
});