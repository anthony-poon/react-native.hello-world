import React from "react";
import {View, StyleSheet, Text} from "react-native";
import {BackgroundStyle, BorderStyle, SpacingStyle, TextStyle} from "../../styles";
import PropTypes from "prop-types"

export default class ListGroup extends React.Component {
    render() {
        const { title, children } = this.props;
        return (
            <View style={styles.container}>
                {
                    !!title ? (
                        <Text style={styles.title}>{ title }</Text>
                    ) : (
                        <View style={styles.separator}>
                            <Text>{ title }</Text>
                        </View>
                    )
                }
                <View style={styles.content}>
                    { children }
                </View>
            </View>
        );
    }
}

ListGroup.propTypes = {
    title: PropTypes.node
};

const styles = StyleSheet.create({
    container: {
        ...BackgroundStyle.light,
    },
    title: {
        ...TextStyle.secondary,

        ...SpacingStyle.px3,
        ...SpacingStyle.py1
    },
    separator: {
        ...SpacingStyle.mb1
    },
    content: {
        ...BackgroundStyle.white,
        ...BorderStyle.shadow1,
    }
});