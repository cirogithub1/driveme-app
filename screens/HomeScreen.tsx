import {SafeAreaView, View, Image } from 'react-native'

//Navigate
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

import NavOptions from '../components/NavOptions'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

//redux
import { useDispatch } from 'react-redux'
import { setOrigin } from '../slices/navSlice'

//@ts-ignore
import { GOOGLE_MAPS_API_KEY } from "@env"
//@ts-ignore
import taxi from '../assets/taxi.png'
import NavFavorites from '../components/NavFavorites'

export type NavigationProps = NativeStackNavigationProp<
	RootStackParamList, 
	"Home">

const HomeScreen = () => {
	const dispatch = useDispatch()

	return (
		<SafeAreaView className = "bg-white h-full">
			<View className='p-2'>
				<Image 
					className='h-20 w-20'
					source={taxi} />
				
				<GooglePlacesAutocomplete
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
							}))
						}}
				/>

				<NavOptions />
				<NavFavorites />
			</View>
		</SafeAreaView>
	)
}

export default HomeScreen