import { useEffect, useRef } from 'react'
import {SafeAreaView, View, Image } from 'react-native'

//Navigate
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

import NavOptions from '../components/NavOptions'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

//redux
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'

import taxi from '../assets/taxi.png'
import { GOOGLE_MAPS_API_KEY } from "@env"
import NavFavorites from '../components/NavFavorites'

export type NavigationProps = NativeStackNavigationProp<
	RootStackParamList, 
	"Home">

const HomeScreen = () => {
	const dispatch = useDispatch()
	const mapRef = useRef()

	// initialize redux state
	useEffect(() => {
		dispatch(
			setOrigin(null)
		)
		
		dispatch(
			setDestination(null)
		)
	}, [])

	return (
		<SafeAreaView className = "bg-white h-full">
			<View className='p-2'>
				<Image 
					className='h-20 w-20'
					source={taxi} />
				
				<GooglePlacesAutocomplete
					ref={mapRef}
					nearbyPlacesAPI='GooglePlacesSearch'
					enablePoweredByContainer={false}
					debounce={400} 
					placeholder='D`ou'
					query={{
						key: GOOGLE_MAPS_API_KEY,
						language: 'fr',
					}} 
					styles={{
						container: {
							flex: 0,
							marginLeft: 12,
						},
						textInput: {
							height: 36,
							// color: Colors.gray_600,
							// backgroundColor: Colors.gray_200,
							fontSize: 16,
						},
						// predefinedPlacesDescription: {
						// 	color: '#1faadb',
						// },
					}}
					fetchDetails={true}
					onPress={(data, details = null) => {
						// 'details' is provided when fetchDetails = true
						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description
							})
						)
					}}
				/>

				<NavOptions homeMapRef = {mapRef}/>
				<NavFavorites mapRef = {mapRef} />
			</View>
		</SafeAreaView>
	)
}

export default HomeScreen