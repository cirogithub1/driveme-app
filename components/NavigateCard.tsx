import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { Icon } from '@rneui/themed'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
//@ts-ignore
import { GOOGLE_MAPS_API_KEY } from '@env'	
import { Colors } from '../constants/colors'
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'

//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamMap } from '../screens/MapScreen'
import NavFavorites from './NavFavorites'

export type NavigationProps = NativeStackNavigationProp<
	RootStackParamMap, 
	"Navigate">

const NavigateCard = () => {
	const dispatch = useDispatch()
	const navigation = useNavigation<NavigationProps>()

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<Text className='text-center py-3 text-base'>Hey waht's up?</Text>

			<View className='border border-gray-200 flex-shrink'>
				<View>
					<GooglePlacesAutocomplete 
						placeholder='Où vas-tu?'
						nearbyPlacesAPI='GooglePlacesSearch'
						debounce={400}
						enablePoweredByContainer={false}
						styles={mapStyle}
						fetchDetails={true}
						query={{
							key: GOOGLE_MAPS_API_KEY,
							language: 'fr',
						}} 	
						onPress={(data, details = null) => {
							dispatch(setDestination({
								location: details.geometry.location,
								description: data.description
							}))
							navigation.navigate('RideOptions')
						}}
					/>
				</View>

				<NavFavorites />
			</View>

			<View className='flex-row bg-white justify-evenly py-1 mt-auto'>
				<TouchableOpacity 
					className='flex-row bg-black w-24 px-2 py-2 rounded-full justify-evenly'
					onPress={() => navigation.navigate('RideOptions')}
				>
					<Icon name="car" type="ionicon" color='white' size={18} />

					<Text className='text-white text-center text-xs'>Rides</Text>
				</TouchableOpacity>

				<TouchableOpacity className='flex-row w-24 px-2 py-2 rounded-full justify-evenly'>
					<Icon name="fast-food" type="ionicon" color='black' size={18} />

					<Text className='text-center text-xs'>Rides</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

const mapStyle = {
	container: {
		backgroundColor: "white",
		paddingTop: 10,
		flex: 0
	},
	textInput: {
		backgroundColor: Colors.gray_200,
		borderRadius: 0,
		fontSize: 16
	},
	textInputContainer: {
		paddingHorizontal: 18,
		paddingBottom: 0
	}
}

export default NavigateCard