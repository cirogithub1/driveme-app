import {SafeAreaView, View, Text, Image } from 'react-native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../App'

import NavOptions from '../components/NavOptions'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
//@ts-ignore
import { GOOGLE_MAPS_API_KEY } from "@env"
//@ts-ignore
import taxi from '../assets/taxi.png'

export type NavigationProps = NativeStackNavigationProp<
	RootStackParamList, 
	"Home">

const HomeScreen = () => {
	const navigation = useNavigation<NavigationProps>()

	return (
		<SafeAreaView className = "bg-white h-full">
			<View className='p-2'>
				<Image 
					className='h-20 w-20'
					source={taxi} />

				<GooglePlacesAutocomplete 
					nearbyPlacesAPI='GooglePlacesSearch'
					debounce={400} 
					placeholder='Search'
					query={{
						key: GOOGLE_MAPS_API_KEY,
						language: 'en',
					}} />

				<NavOptions />
			</View>
		</SafeAreaView>
	)
}

export default HomeScreen