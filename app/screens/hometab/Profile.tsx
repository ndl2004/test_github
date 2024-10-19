import { StyleSheet, StatusBar, Text, View } from 'react-native'
import React from 'react'
import {  Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import FirstRoute from '../profiletab/FirstRoute';
import SecondRoute from '../profiletab/SecondRoute';
export default class TabViewExample extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'First' },
            { key: 'second', title: 'Second' },
        ],
    };

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
                style={styles.container}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
    },
    scene: {
        flex: 1,
    },
});