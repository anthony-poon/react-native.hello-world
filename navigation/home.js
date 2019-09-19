import {createStackNavigator} from "react-navigation";
import IndexApp from "../views/IndexApp";
import {View} from "react-native";
import NavigatorIcon from "../shares/components/NavigatorIcon";
import React from "react";

const HomeStack = createStackNavigator({
    Home: IndexApp,
});

HomeStack.navigationOptions = {
    tabBarLabel: <View/>,
    tabBarIcon: ({focused}) => (
        <NavigatorIcon
            text={"Home"}
            icon={"home"}
            focused={focused}
        />
    ),
};

export default HomeStack;