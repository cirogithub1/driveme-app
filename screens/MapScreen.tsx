import { View } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Map from '../components/Map'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'

export type RootStackParamNav = {
  Navigate: undefined
  RideOptions: undefined
}

const Stack = createNativeStackNavigator<RootStackParamNav>()

const MapScreen = () => {

	return (
		<View>
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