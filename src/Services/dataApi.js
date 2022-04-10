// import axiosClient from "./axiosClient";

import axios from "axios";
import { getStorage } from "./firebaseService";

const dataApi = {
	getMaps: async () => {
		var storage = getStorage();
		var url = await storage.ref("/data/Maps.json").getDownloadURL();
		return await axios.get(url).then((resp) => {
			return resp.data;
		})
	},

	getAmmo: async () => {
		var storage = getStorage();
		var url = await storage.ref("/data/Ammo.json").getDownloadURL();
		return await axios.get(url).then((resp) => {
			return resp.data;
		})
	}
}

export default dataApi;