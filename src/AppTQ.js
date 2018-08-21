/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
	StackNavigator,
	TabNavigator,
} from 'react-navigation';

import List from './pages/List';
import Detail from './pages/Detail';

import {
	StyleSheet,
	Text,
	View,
	Image,
	FlatList,
} from 'react-native';


const AppTQ = StackNavigator({
	List: {screen: List},
	Detail: {screen: Detail},
}, {
	headerMode: 'screen'
});

export default AppTQ;