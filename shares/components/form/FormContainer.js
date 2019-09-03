import React from "react";
import {View, StyleSheet} from "react-native";
import {BackgroundStyle} from "../../styles";
import PropTypes from "prop-types"

export default class FormContainer extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <View style={styles.container}>
                { children }
            </View>
        );
    }
}

FormContainer.propTypes = {
    children: PropTypes.node
}

const styles = StyleSheet.create({
    container: {
        ...BackgroundStyle.light,
        flex: 1,
    }
});