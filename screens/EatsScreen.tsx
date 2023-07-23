import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'

// current position
import createMapLink from 'react-native-open-maps'
import * as ExpoLocation from 'expo-location'
import { GOOGLE_MAPS_API_KEY } from "@env"


// const URL_CONVERTER = `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=${GOOGLE_MAPS_API_KEY}`
const URL_CONVERTER =  `https://maps.googleapis.com/maps/api/geocode/json?latlng=`

interface LocationProps {
	latitude: number,
	longitude: number
}

const EatsScreen = ({ homeMapRef }) => {
	const [location, setLocation] = useState<LocationProps>(null)
	const [address, setAddress] = useState(null)

	// Function to get permission for location
	const getLocation = async () => {
		try {
			const { status } = await ExpoLocation.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permision Status: ', status)
        return
      }

			const position = await ExpoLocation.getCurrentPositionAsync({})
			
      setLocation({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
			})

			const response = await fetch(`${URL_CONVERTER} + ${location.latitude} + ${location.longitude} + &key= ${GOOGLE_MAPS_API_KEY}`)
			const dataPlace = await response.json()
			// console.log('dataPlace: ', dataPlace.results[1].formatted_address)

			createMapLink({ provider: 'google', start: dataPlace.results[1].formatted_address, end: 'L`Antre O Potes, Epagny, France', travelType: 'drive' })

		} catch (err) {
			return false
		}
	}

	return (
		<View className='mt-8 mx-auto'>
			<Text className='text-2xl'>This is the Eats screen</Text>
			<Text>get the current position</Text>
			<Text>open google maps directions</Text>
			<Text>fro</Text>

			<TouchableOpacity
				className='items-center'
				onPress={getLocation} >

				<Text className='text-sm mt-5 text-blue-500'>Open google directions</Text>
			</TouchableOpacity>
		</View>
	)
}

const position = {
	"timestamp":1690125948727,
	"mocked":false,
	"coords":{
		"altitude":512.7000122070312,
		"heading":0,
		"altitudeAccuracy":46.69273376464844,
		"latitude":45.9061725,
		"longitude":6.0977567,
		"speed":0,
		"accuracy":100
	}
}

export default EatsScreen