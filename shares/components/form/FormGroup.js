import React from "react";
import {View, StyleSheet} from "react-native";
import {BackgroundStyle, BorderStyle, SpacingStyle} from "../../styles";
import PropTypes from "prop-types"

export default class FormGroup extends React.Component {
    render() {
        const { title, children } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    { title }
                </View>
                <View style={styles.content}>
                    { children }
                </View>
            </View>
        );
    }
}

FormGroup.propTypes = {
    title: PropTypes.node
};

const styles = StyleSheet.create({
    container: {

    },
    header: {
        ...BackgroundStyle.light,
        ...SpacingStyle.px2,
        ...SpacingStyle.py1
    },
    content: {
        ...BackgroundStyle.white,
        ...BorderStyle.shadow1
    }
});