import {createStackNavigator} from "react-navigation";
import ContactListApp from "../views/app-demo/contact-list/ContactListApp";
import ViewContactApp from "../views/app-demo/contact-list/ViewContactApp";
import EditContactApp from "../views/app-demo/contact-list/EditContactApp";
import {View} from "react-native";
import NavigatorIcon from "../shares/components/NavigatorIcon";
import React from "react";
import AppDemoApp from "../views/app-demo/AppDemoApp";

const AppDemoStack = createStackNavigator({
    AppDemo: AppDemoApp,
    ContactList: ContactListApp,
    DisplayDetail: ViewContactApp,
    EditDetail: EditContactApp,
});

AppDemoStack.navigationOptions = {
    tabBarLabel: <View/>,
    tabBarIcon: ({focused}) => (
        <NavigatorIcon
            text={"Apps"}
            icon={"list-ul"}
            focused={focused}
        />
    ),
};

export default AppDemoStack;