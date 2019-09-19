import {createStackNavigator} from "react-navigation";
import FlexLabApp from "../views/flex/FlexLabApp";
import {View} from "react-native";
import NavigatorIcon from "../shares/components/NavigatorIcon";
import React from "react";
import ModalApp from "../views/modal/ModalApp";

const SandboxStack = createStackNavigator({
    FlexLab: FlexLabApp,
    Modal: ModalApp
});

SandboxStack.navigationOptions = {
    tabBarLabel: <View/>,
    tabBarIcon: ({focused}) => (
        <NavigatorIcon
            text={"Sandbox"}
            icon={"inbox"}
            focused={focused}
        />
    ),
};

export default SandboxStack;