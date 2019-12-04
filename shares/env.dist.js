// https://alxmrtnz.com/thoughts/2019/03/12/environment-variables-and-workflow-in-expo.html
import Constants from "expo-constants";

const env = !!__DEV__ ? "__DEV__" : Constants.manifest.releaseChannel;

const config = {
    "__DEV__": {
        DOTENV: "dev",
        END_POINT_URL: "http://example.com"
    },
    "default": {
        DOTENV: "prod",
        END_POINT_URL: "http://example.com"
    }
};

export default config[env];