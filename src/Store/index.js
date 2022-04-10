import { configureStore } from "@reduxjs/toolkit";
import { ammoSlice } from './ammoSlice';
import { mapSlice } from './mapSlice';

const store = configureStore({
	reducer: {
		ammo: ammoSlice.reducer,
		map: mapSlice.reducer
	}
})

export default store;