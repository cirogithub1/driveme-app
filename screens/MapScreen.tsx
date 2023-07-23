import { View, TouchableOpacity } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Map from '../components/Map'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'
import { Icon } from '@rneui/themed'

//Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../App'
// for going Home
export type NavigationProps = NativeStackNavigationProp<
	RootStackParamList, 
	"Home">

export type RootStackParamMap = {
  Navigate: undefined
  RideOptions: undefined
}

const Stack = createNativeStackNavigator<RootStackParamMap>()

const MapScreen = () => {
	const navigation = useNavigation<NavigationProps>()

	return (
		<View>
			<TouchableOpacity 
				className='absolute top-5 left-5 bg-gray-100 rounded-full p-2 shadow-lg z-10'
				onPress={() => navigation.navigate("Home")}
			>
				<Icon name='menu' type='ionicon' color='black'size={22} />
			</TouchableOpacity>
			<View className='h-1/2'>
				<Map />
			</View>

			<View className='h-1/2'>
				<Stack.Navigator>
					<Stack.Screen 
						name='Navigate'
						component={NavigateCard}
						options={{
							headerShown: false
						}} />
					
					<Stack.Screen 
						name='RideOptions'
						component={RideOptionsCard}
						options={{
							headerShown: false
						}} />
				</Stack.Navigator>

			</View>
		</View>
	)
}

export default MapScreen