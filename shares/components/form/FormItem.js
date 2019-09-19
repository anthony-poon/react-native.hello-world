import React from "react"
import PropTypes from "prop-types";
import {StyleSheet, View} from "react-native";
import {BorderStyle, SpacingStyle} from "../../styles";

export default class FormItem extends React.Component {
     render() {
        const {
            children,
            last,
            ...rest
        } = this.props;
        return (
            <View {...rest} style={styles.container}>
                <View style={!last ? styles.border : null }>
                    { children }
                </View>
            </View>
        );
    }

}

FormItem.defaultProps = {
    last: false
};

FormItem.propTypes = {
    last: PropTypes.bool,
    children: PropTypes.node.isRequired
};


const styles = StyleSheet.create({
    container: {
        ...SpacingStyle.px3,
        flexGrow: 1,
    },
    border: {
        ...BorderStyle.borderBottom,
        flexGrow: 1,
    }
});