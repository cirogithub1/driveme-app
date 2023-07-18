import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { Icon } from '@rneui/themed'

//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../App'

//@ts-ignore
import car from '../assets/car.png'
//@ts-ignore
import pack from '../assets/pack.png'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'

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
	const origin = useSelector(selectOrigin)

	return (
		<View>
			<View className='flex-row justify-between px-4'>
				{data.map((item:any) => (
					<TouchableOpacity
						key={item.id}	
						className='p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-36'
						onPress={() => (navigation.navigate(item.screen))}
						disabled={origin ? false : true}
					>
						<View className=''>
							<Image 
								className='h-20 w-20'
								source={item.image}
							/>

							<Text className='mt-2 text-base font-semibold'>
								{item.title}
							</Text>
						</View>

						<View className={`
							p-2 rounded-full w-10 mt-4 ${origin ? 'bg-lime-400' : 'opacity-50'}`}>
							<Icon name='arrowright' color='white' type='antdesign'/>
						</View>
					</TouchableOpacity>
				))}
			</View>
		</View>
	)
}

export default NavOptions