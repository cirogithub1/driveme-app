import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"

import { Provider } from "react-redux"
import { store } from "./store"
import HomeScreen from './screens/HomeScreen';

export type RootStackParamList = {
  Home: undefined
}

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            statusBarStyle: "dark",
            headerShown: false, 
            navigationBarHidden: true, 
            statusBarHidden: true,
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}