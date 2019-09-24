import {createStackNavigator} from "react-navigation";
import {View} from "react-native";
import NavigatorIcon from "../shares/components/NavigatorIcon";
import React from "react";
import ComponentDemoApp from "../views/component-demo/ComponentDemoApp";
import FormTextInputDemoApp from "../views/component-demo/form/FormTextInputDemoApp";
import FormToggleDemoApp from "../views/component-demo/form/FormToggleDemoApp";
import ListItemDemoApp from "../views/component-demo/list/ListItemDemoApp";
import FormPickerDemoApp from "../views/component-demo/form/FormPickerDemoApp";

const ComponentDemoStack = createStackNavigator({
    ComponentDemo: ComponentDemoApp,
    FormTextInputDemo: FormTextInputDemoApp,
    FormToggleDemo: FormToggleDemoApp,
    ListItemDemo: ListItemDemoApp,
    FormPickerDemo: FormPickerDemoApp
});

ComponentDemoStack.navigationOptions = {
    tabBarLabel: <View/>,
    tabBarIcon: ({focused}) => (
        <NavigatorIcon
            text={"Component"}
            icon={"list-ul"}
            focused={focused}
        />
    ),
};

export default ComponentDemoStack;