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

import Teastset from './Teastset';

import {
	StyleSheet,
	Text,
	View,
	Image,
	FlatList,
} from 'react-native';

import Item from './components/TQItem';

import MoviesTQ from '../movies';

const AppTQ = StackNavigator({
	Teastset: {screen: Teastset},
}, {
	headerMode: 'screen'
});


const styles = StyleSheet.create({
	row: {
		paddingHorizontal: 15,
	}
});

const api = 'https://api.douban.com/v2/movie/in_theaters';

export default  class MyApp extends  Component {
	state = {
		Movies: [],
		refreshing: false,
	};
	start = 0;
	count = 4;
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
	async componentDidMount() {
		this.fetchData();
	}

	freshData = async () => {
		const json = await this.fetchData();
		this.setState({
			Movies: json.subjects,
		});
	};

	fetchMore = async () => {
		// const json = await this.fetchData(this.start, this.count);
		const json = this.fetchData(this.start, this.count);
		if (json) {
			this.start += this.count - 1;
			this.setState({
				Movies: this.state.Movies.concat(json.subjects),
			});
		}
	};
	static navigationOption = {
		title: 'Welcome',
	}
	render() {
		const {Movies, refreshing} = this.state;
		const { navigate } = this.props.navigation;
		return (
			<View>
				<FlatList
					numColumns={3}
					columnWrapperStyle={styles.row}
					keyExtractor={item => item.id}
					data = {Movies}
					onRefresh={this.freshData}
					onEndReached={this.fetchMore}
					onEndReachedThreshold={0}
					refreshing={refreshing}
					// renderItem={({item}) => <Item title={item.title} image={item.images.medium} stars={item.rating.stars}/>}
					renderItem={({ item }) => {
						return (<Item
							title={item.title}
							image={item.images.medium}
							stars={item.rating.stars}
							onPress={() => navigate('Teastset', {
								// id: item.id,
								// callback: (data) => {
								// 	this.setState({
								// 		childState: data
								// 	});
								// }
							})}
						/>);
					}
					}
				/>
			</View>
		);
	}

}