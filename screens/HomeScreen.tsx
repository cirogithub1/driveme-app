import {SafeAreaView, View, Text } from 'react-native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../App'

export type NavigationProps = NativeStackNavigationProp<
	RootStackParamList, 
	"Home">

const HomeScreen = () => {
	const navigation = useNavigation<NavigationProps>()

	return (
		<SafeAreaView>
			<Text>HomeScreen</Text>
		</SafeAreaView>
	)
}

export default HomeScreen