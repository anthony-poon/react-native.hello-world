import React from "react"
import {View, Text} from "react-native";
import * as TimeUtil from "../utils/time";

export default class TimeUtilApp extends React.Component {
    render() {
        return (
            <View>
                <Text>{TimeUtil.toHumanReadable()}</Text>
            </View>
        );
    }
}