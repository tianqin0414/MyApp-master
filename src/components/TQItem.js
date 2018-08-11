/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const thirdWidth = width / 3;

const imageWidth = thirdWidth - 10 * 2;

const styles = StyleSheet.create({
	root: {
		marginTop: 20,
		width: imageWidth,
		marginRight: 15,
	},
	image: {
		width: imageWidth,
		height: width / 3 / 0.697,
	},
	title: {
		marginTop: 5,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	starsWrapper: {
		flexDirection: 'row',
	},
	stars: {
		width: 10,
		height: 10,
	}
});

const renderStars = (stars) => {
	if (stars === '00') {
		return;
	}
	const total = 5;

	let full, half, empty;

	full = parseInt(stars[0]) - 1;
	if (stars[1] === '5') {
		full++;
		half = 0;
		empty = total - full - half;
	} else {
		half = 1;
		empty = total - full - half;
	}

	const results = [];
	let i;
	for (i = 0; i < full; i++) {
		results.push(
			<Image key={i} style={styles.stars} source={require('../img/star-full.png')}/>
		);
	}
	if (half) {
		results.push(
			<Image key={i} style={styles.stars} source={require('../img/star-half.png')}/>
		);
	}
	for (let j = 0; j < empty; j++) {
		results.push(
			<Image key={i + j + 1} style={styles.stars} source={require('../img/star-empty.png')}/>
		);
	}
	return (
		<View style={styles.starsWrapper}>
			{results}
		</View>
	);
};

const Item = (props) => {
	const { title, image, stars } = props;
	return (
		<View style={styles.root}>
			<Image
				source = {{uri: image}}
				style={styles.image}
			/>
			<Text style={styles.title} numberOfLines={1}>{title}</Text>
			{renderStars(stars)}
		</View>
	);
};


export default Item;