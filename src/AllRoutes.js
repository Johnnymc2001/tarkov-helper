import { Routes, Route } from 'react-router-dom';
import App from './App';
import AmmoPage from './Pages/AmmoPage';
import MapPage from './Pages/MapPage';
import MapDetail from './Pages/MapDetail';
import Bosses from './Pages/Bosses';
import NotFound from './Pages/NotFound';

function AllRoutes() {
	return (
		<Routes>
			<Route path="" element={<App />} />
			<Route path="ammo" element={<AmmoPage />} />
			<Route path="maps">
				<Route path="" element={<MapPage />} />
				<Route path=":mapName" element={<MapDetail />} />
			</Route>
			<Route path="bosses" element={<Bosses />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default AllRoutes;
