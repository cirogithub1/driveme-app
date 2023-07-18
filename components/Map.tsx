import { View, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux'
import { selectDestination, selectOrigin } from '../slices/navSlice'

//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../App'
import MapViewDirections from 'react-native-maps-directions'
//@ts-ignore
import { GOOGLE_MAPS_API_KEY } from '@env'
import { Colors } from '../constants/colors'
import { useEffect, useRef } from 'react'

export type NavigationProps = NativeStackNavigationProp<
	RootStackParamList, 
	"Home">

const Map = () => {
	const origin = useSelector(selectOrigin)
	const destination = useSelector(selectDestination)
	const mapRef = useRef(null)

	useEffect(() => {
		if (!origin || !destination) {
			return
		}

		mapRef.current.fitToSuppliedMarkers(['origin', 'destination'])
	}, [origin, destination])
	
	return (
		<View className='flex-1'>
			{origin
				?
					<MapView 
						ref={mapRef}
						className='flex-1'
						initialRegion={{
							latitude: origin.location.lat,
							latitudeDelta: 0.005,
							longitude: origin.location.lng,
							longitudeDelta: 0.005
						}}
						mapType='mutedStandard'
					>
						{destination && (
							<MapViewDirections 
								origin={origin.description}
								destination={destination.description}
								apikey={GOOGLE_MAPS_API_KEY}
								strokeColor={Colors.neutral_950}
								strokeWidth={3}
							/>
						)}

						{/* origin */}
						<Marker 
							coordinate={{
								latitude: origin.location.lat,
								longitude: origin.location.lng
							}}
							title='Origin'
							description={origin.description}
							identifier="origin"
							pinColor='yellow'
						/>

						{destination &&
							<Marker 
								coordinate={{
									latitude: destination.location.lat,
									longitude: destination.location.lng
								}}
								title='Destination'
								description={destination.description}
								identifier="destination"
							/>
						}
					</MapView>
				:
					<View>
						<Text>No origin selected</Text>
					</View>
			}

		</View>
	)
}

export default Map