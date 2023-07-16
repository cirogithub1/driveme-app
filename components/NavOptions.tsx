import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { Icon } from '@rneui/themed'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../App'

//@ts-ignore
import car from '../assets/car.png'
//@ts-ignore
import pack from '../assets/pack.png'


type ItemData = {
  id: string
  title: string
	image: any
	screen: string
}

const data: ItemData[] = [
	{
		id: "123",
		title:"Get a ride",
		image: car,
		screen: "Map"
	},
	{
		id: "234",
		title:"Order food",
		image: pack,
		screen: "Eats"
	}
]

export type NavigationProps = NativeStackNavigationProp<
	RootStackParamList, 
	"Home">

const NavOptions = () => {
	const navigation = useNavigation<NavigationProps>()

	return (
		<View>
			<View className='flex-row justify-between px-4'>
				{data.map((item:any) => (
					<TouchableOpacity
						key={item.id}	
						className='p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-36'
						onPress={() => (navigation.navigate(item.screen))}
					>
						<Image 
							className='h-20 w-20'
							source={item.image}
						/>

						<Text className='mt-2 text-base font-semibold'>
							{item.title}
						</Text>

						<View className='p-2 bg-black rounded-full w-10 mt-4'>
							<Icon name='arrowright' color='white' type='antdesign'/>
						</View>
					</TouchableOpacity>
				))}
			</View>
			{/* <FlatList 
				data={data} 
				horizontal={true} 
				keyExtractor={(item) => item.id}
				renderItem={({item}: {item: ItemData}) => (
					<TouchableOpacity
						className='p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-36'
					>
						<View>
							<Image 
								className='h-20 w-20'
								source={item.image}
							/>
						</View>

						<Text className='mt-2 text-base font-semibold'>
							{item.title}
						</Text>

						<View className='p-2 bg-black rounded-full w-10 mt-4'>
							<Icon name='arrowright' color='white' type='antdesign'/>
						</View>
					</TouchableOpacity>
				)}
			/> */}
		</View>
	)
}

export default NavOptions