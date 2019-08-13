import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import IndexApp from "./view/IndexApp";

export default function App() {
    return (
        <View style={styles.container}>
            <IndexApp/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingBottom: 40
    }
});

