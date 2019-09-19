import {createBottomTabNavigator} from "react-navigation-tabs";
import HomeStack from "./home";
import AppDemoStack from "./app-demo"
import SandboxStack from "./sandbox";
import ComponentDemoStack from "./component-demo";

const BottomTabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    AppDemo: AppDemoStack,
    ComponentDemo: ComponentDemoStack,
    Sandbox: SandboxStack,
});

export default BottomTabNavigator;