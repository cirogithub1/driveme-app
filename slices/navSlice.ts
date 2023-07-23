import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Point } from 'react-native-google-places-autocomplete'

interface OriginProps {
	location: Point
	description: string
}
interface InitialProps {
	origin: OriginProps | null
	destination: OriginProps | null
	travelTimeInformation: any
}

const initialState: InitialProps = {
	origin: null,
	destination: null,
	travelTimeInformation: null
}

export const navSlice = createSlice({
	name: 'nav',
	initialState,
	reducers: {
		setOrigin: (state, action: PayloadAction<OriginProps>) => {
			state.origin = action.payload
		},
		setDestination: (state, action: PayloadAction<OriginProps>) => {
			state.destination = action.payload
		},
		setTravelTimeInformation: (state, action: PayloadAction<any>) => {
			state.travelTimeInformation = action.payload
		}
	}
})

export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions

export const selectOrigin = (state: any) => state.nav.origin
export const selectDestination = (state: any) => state.nav.destination
export const selectTravelTimeInformation = (state: any) => state.nav.travelTimeInformation

export default navSlice.reducer