import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { Provider } from "react-redux"
import { store } from "./store"

import HomeScreen from './screens/HomeScreen'
import MapScreen from "./screens/MapScreen"
import EatsScreen from "./screens/EatsScreen"

export type RootStackParamList = {
  Home: undefined
  Map: undefined
  Eats: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaProvider>
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

            <Stack.Screen 
              name="Map" 
              component={MapScreen}
            />

            <Stack.Screen 
              name="Eats" 
              component={EatsScreen}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </Provider>
    </NavigationContainer>
  )
}