import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface InitialProps {
	origin: string
	destination: string
	travelTimeInformation: string

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
		setOrigin: (state, action: PayloadAction<string>) => {
			state.origin = action.payload
		},
		SetDestination: (state, action: PayloadAction<string>) => {
			state.destination = action.payload
		},
		SetTravelTimeInformation: (state, action: PayloadAction<string>) => {
			state.destination = action.payload
		}
	}
})


export const { setOrigin, SetDestination, SetTravelTimeInformation } = navSlice.actions

export const selectOrigin = (state: any) => state.nav.origin
export const selectDestination = (state: any) => state.nav.destination
export const selectTravelTimeInformation = (state: any) => state.nav.travelTimeInformation

export default navSlice.reducer