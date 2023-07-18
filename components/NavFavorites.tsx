import { View, Text } from 'react-native'
import React from 'react'

const data = [
	{
		id: "123",
		icon: "home",
		location: "Home",
		destination: "Avenue de la République, Paris, France"
	},
	
	{
		id: "234",
		icon: "briefcase",
		location: "Work",
		destination: "Rue de la Paix, Paris, France"
	}
]

const NavFavorites = () => {
	return (
		<View>
			<Text>NavFavorites</Text>
		</View>
	)
}

export default NavFavorites