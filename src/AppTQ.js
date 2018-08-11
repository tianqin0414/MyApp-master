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
	FlatList,
} from 'react-native';

import Item from './components/TQItem';

import MoviesTQ from '../movies';

const styles = StyleSheet.create({
	row: {
		paddingHorizontal: 15,
	}
});

const api = 'https://api.douban.com/v2/movie/in_theaters?s';

export default  class MyApp extends  Component {
	state = {
		Movies: [],
		refreshing: false,
	};
	// start = 0;
	// count = 12;
	refreshing = false;
	fetchData = (start = 0, count = 3) => {
		// this.setState({
		// 	refreshing: true,
		// });
		this.refreshing = true;
		fetch(`${api}?start=${start}&count=${count}`)
			.then(response => response.text())
			.then(responseText => {
				const json = JSON.parse(responseText);
				this.setState({
					Movies: json.subjects,
				});
				this.setState({
					// movies: json.subjects,
					refreshing: false,
				});
				this.refreshing = false;
				return json;
			})
			.catch(error => {
				console.error(error);
			});
	}
	componentDidMount() {
		this.fetchData();
	}

	freshData = async () => {
		const json = await this.fetchData();
		this.setState({
			Movies: json.subjects,
		});
	};

	render() {
		const {Movies, refreshing} = this.state;
		return (
			<View>
				<FlatList
					numColumns={3}
					columnWrapperStyle={styles.row}
					keyExtractor={item => item.id}
					data = {Movies}
					onRefresh={this.freshData}
					refreshing={refreshing}
					renderItem={({item}) => <Item title={item.title} image={item.images.medium} stars={item.rating.stars}/>}
				/>
			</View>
		);
	}

}