import { View, TouchableOpacity, Text } from 'react-native'
import { Icon } from '@rneui/themed'
import { Colors } from '../constants/colors'

const data = [
	{
		id: "123",
		icon: "home",
		location: "Home",
		destination: "Avenue de la République, Paris, France"
	},
	
	{
		id: "234",
		icon: "work",
		location: "Work",
		destination: "Rue de la Paix, Paris, France"
	}
]

const NavFavorites = ({ mapRef }) => {
	return (
		<View>
			{data.map((item:any) =>(
				<TouchableOpacity
					key={item.id}
					className='flex-row items-center p-5'
				>
					<View className='mr-2 rounded-full bg-gray-300 p-2'>
						<Icon name={item.icon} size={20} color='white'/>
					</View>

					<View className=''>
						<Text className="text-base font-semibold">{item.location}</Text>
						<Text className='text-xs text-gray-500'>{item.destination}</Text>
					</View>

				</TouchableOpacity>
			))}
		</View>
	)
}

export default NavFavorites