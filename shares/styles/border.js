import * as Color from "./var";

const style = {
    primary: {
        borderColor: Color.COLOR_PRIMARY
    },
    secondary: {
        borderColor: Color.COLOR_SECONDARY
    },
    success: {
        borderColor: Color.COLOR_SUCCESS
    },
    danger: {
        borderColor: Color.COLOR_DANGER
    },
    warning: {
        borderColor: Color.COLOR_WARNING
    },
    info: {
        borderColor: Color.COLOR_INFO
    },
    light: {
        borderColor: Color.COLOR_LIGHT
    },
    dark: {
        borderColor: Color.COLOR_DARK
    },
    muted: {
        borderColor: Color.COLOR_MUTED
    },
    white: {
        borderColor: Color.COLOR_WHITE
    },
    borderTop: {
        borderTopWidth: 1,
        borderColor: Color.COLOR_BORDER
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderColor: Color.COLOR_BORDER
    },
    borderLeft: {
        borderLeftWidth: 1,
        borderColor: Color.COLOR_BORDER
    },
    borderRight: {
        borderRightWidth: 1,
        borderColor: Color.COLOR_BORDER
    },
    borderX: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: Color.COLOR_BORDER
    },
    borderY: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Color.COLOR_BORDER
    },
    border: {
        borderWidthWidth: 1,
        borderColor: Color.COLOR_BORDER
    },
    shadow1: {
        // Elevation is Android only
        elevation: 1,
        shadowColor: Color.COLOR_SECONDARY,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
    shadow2: {
        // Elevation is Android only
        elevation: 3,
        shadowColor: Color.COLOR_SECONDARY,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
    shadow3: {
        // Elevation is Android only
        elevation: 5,
        shadowColor: Color.COLOR_SECONDARY,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
    }
};

export default style;