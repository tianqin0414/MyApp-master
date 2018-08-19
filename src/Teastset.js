import React, { Component } from 'react';
import {View} from 'react-native';

import {Label} from 'teaset';

export default class Teastset extends Component {
	render() {
		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Label size='xl' text='Hello world!' />
			</View>
		);
	}
}