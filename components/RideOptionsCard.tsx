import { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { Icon } from '@rneui/themed'

// Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamMap } from '../screens/MapScreen'

// redux
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

// images
import uberX from '../assets/uber_x.png'
import uberXL from '../assets/uber_xl.png'
import uberLUX from '../assets/uber_lux.png'
import { Image } from 'react-native'

export type NavigationProps = NativeStackNavigationProp<
	RootStackParamMap, 
	"Navigate">

const uberCars = [
	{
		id: "Uber-X",
		title: "Uber X",
		multiplier: 1,
		image: uberX
	},
	
	{
		id: "Uber-XL",
		title: "Uber XL",
		multiplier: 1.2,
		image: uberXL
	},
	
	{
		id: "Uber-LUX",
		title: "Uber LUX",
		multiplier: 1.5,
		image: uberLUX
	}
]

const SURGE_CHARGE_RATE = 1.25

const RideOptionsCard = () => {
	const navigation = useNavigation<NavigationProps>()
	const [carSelected, setCarSelected] = useState(null)
	const travelTiemInformation = useSelector(selectTravelTimeInformation)

	return (
		<View className='bg-white flex-grow'>
			<View className='flex-row'>
				<View className='absolute top-1 left-5 py-2'>
					<TouchableOpacity 
						onPress={() => navigation.navigate('Navigate')}
					>
						<Icon name='chevron-back' type='ionicon' size={18} />
					</TouchableOpacity>
				</View>

				<Text className='text-center py-2 text-base mx-auto'>Choisissez l'option - {travelTiemInformation?.distance?.text}</Text>
			</View>

			{uberCars.map((car:any) => (
				<TouchableOpacity
					key={car.id}
					className={`flex-row justify-between items-center px-6
						${carSelected?.id === car.id ? 'bg-neutral-200' : 'bg-white'}`}
					onPress={() => setCarSelected(car)}
				>
					<Image 
						className='w-20 h-20' 
						source={car.image} 
						resizeMode='contain'
				/>

				<View className='justify-center -ml-2'>
					<Text className='text-xs font-extrabold'>{car.title}</Text>
					<Text className='text-xs'>{travelTiemInformation?.duration?.text}</Text>
				</View>

				<Text className='text-sm font-extrabold'>
					{new Intl.NumberFormat('fr-FR', {
						style: 'currency',
						currency: 'EUR'
					}).format(
						(travelTiemInformation?.duration.value * SURGE_CHARGE_RATE * car.multiplier) / 100
					)
					}
				</Text>
				</TouchableOpacity>
			))}

			<View className='mt-auto'>
				<TouchableOpacity 
					className={`bg-black py-1 m-1
						${!carSelected && 'bg-gray-200'}`}
					disabled={!carSelected}
				>
					<Text className='text-white text-center'>
						Choisi: {carSelected?.title}
					</Text>
				</TouchableOpacity>
			</View>

		</View>
	)
}

export default RideOptionsCard