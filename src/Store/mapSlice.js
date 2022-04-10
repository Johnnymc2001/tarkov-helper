import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStorage } from '../Services/firebaseService';
import dataApi from './../Services/dataApi';

const initialState = {
	data: undefined,
	mapImages: {}
}

export const getMapDataFromStorage = createAsyncThunk("map/getDataStatus", async () => {
	const response = await dataApi.getMaps();
	return response;
})

export const getMapImages = createAsyncThunk("map/getImages", async (mapName) => {
	var storage = getStorage();

	const smallImg = [];
	const largeImg = [];

	async function get() {
		var refList = await storage.ref(`/map/${mapName}`).listAll();
		var list = refList.items;

		var tmpSmall = list.filter(item => item.fullPath.includes("small"));
		var tmpLarge = list.filter(item => !item.fullPath.includes("small"));
		var p = Promise.resolve()

		for (const item of tmpSmall) {

			try {
				await item.getDownloadURL().then((downloadURL) => {
					smallImg.push(downloadURL);
				})
			} catch (err) {
				console.log(err);
			}

		}

		for (const item of tmpLarge) {

			try {
				await item.getDownloadURL().then((downloadURL) => {
					largeImg.push(downloadURL);
				})
			} catch (err) {
				console.log(err);
			}
		}
	}

	await get();

	var result = {
		mapName: mapName,
		images: { largeImg: largeImg, smallImg: smallImg }
	}
	return result;
})

export const mapSlice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		setData: (state, action) => {
			state.data = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getMapDataFromStorage.fulfilled, (state, action) => {
			state.data = action.payload;
		});
		builder.addCase(getMapImages.fulfilled, (state, action) => {
			state.mapImages[action.payload.mapName] = action.payload.images;
		})
	}
})

export const mapActions = mapSlice.actions;
export default mapSlice.reducer