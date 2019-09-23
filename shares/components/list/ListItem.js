import React from "react";
import {StyleSheet, View, Text} from "react-native";
import PropTypes from "prop-types";
import {BorderStyle, SpacingStyle} from "../../styles";

/**
 * To be use inside a scroll view. Added border, px3, py3 to child. This service as a bases for other list like component
 */
export default class ListItem extends React.Component {
    render() {
        const {
            children,
            last,
            containerStyle,
            ...rest
        } = this.props;
        return (
            <View {...rest} style={{...styles.container, ...containerStyle}}>
                <View style={[
                    styles.content,
                    !last && styles.border
                ]}>
                    { children }
                </View>
            </View>
        );
    }
}


ListItem.defaultProps = {
    last: false
};

ListItem.propTypes = {
    last: PropTypes.bool,
    children: PropTypes.node.isRequired,
    containerStyle: PropTypes.object
};


const styles = StyleSheet.create({
    container: {
        ...SpacingStyle.px3,
    },
    content: {
        ...SpacingStyle.py3,
        flexGrow: 1,
    },
    border: {
        ...BorderStyle.borderBottom,
    },
    lhs: {
        alignItems: "center",
        justifyContent: "center"
    },
    rhs: {

    }
});