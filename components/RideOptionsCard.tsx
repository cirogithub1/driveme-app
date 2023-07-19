import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { Icon } from '@rneui/themed'

// Navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamMap } from '../screens/MapScreen'

export type NavigationProps = NativeStackNavigationProp<
	RootStackParamMap, 
	"Navigate">

const RideOptionsCard = () => {
	const navigation = useNavigation<NavigationProps>()

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

				<Text className='text-center py-2 text-base mx-auto'>Choisissez un chemin</Text>
			</View>
		</View>
	)
}

export default RideOptionsCard