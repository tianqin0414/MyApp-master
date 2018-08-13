import React, { Component } from 'react';
import {View} from 'react-native';

import {Label} from 'teaset';

export default class HelloWorldApp extends Component {
	render() {
		return (
			<View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
				<Label size='xl' text='Hello world!' />
			</View>
		);
	}
}