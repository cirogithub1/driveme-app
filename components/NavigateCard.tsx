import { View, Text, SafeAreaView } from 'react-native'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
//@ts-ignore
import { GOOGLE_MAPS_API_KEY } from '@env'	
import { Colors } from '../constants/colors'
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'

//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamNav } from '../screens/MapScreen'

export type NavigationProps = NativeStackNavigationProp<
	RootStackParamNav, 
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