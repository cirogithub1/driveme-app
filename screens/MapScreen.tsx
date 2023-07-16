import { View, Text } from 'react-native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../App'

export type NavigationProps = NativeStackNavigationProp<
	RootStackParamList, 
	"Map">

const MapScreen = () => {
	return (
		<View>
			<Text>MapScreen</Text>
		</View>
	)
}

export default MapScreen