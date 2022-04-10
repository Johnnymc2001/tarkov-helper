import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import dataApi from '../Services/dataApi'

const initialState = {
	data: undefined
}

export const getAmmoDataFromStorage = createAsyncThunk("ammo/getDataStatus", async () => {
	const response = await dataApi.getAmmo();
	return response;
})

export const ammoSlice = createSlice({
	name: 'ammo',
	initialState,
	reducers: {
		setData: (state, action) => {
			state.data = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getAmmoDataFromStorage.fulfilled, (state, action) => {
			state.data = action.payload["ammo-data"];
		})
	}
})

export const ammoActions = ammoSlice.actions;
export default ammoSlice.reducer