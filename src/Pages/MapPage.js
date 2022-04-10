import { useState, Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import ImageMapper from 'react-image-mapper';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getMapDataFromStorage } from './../Store/mapSlice';


const mapArea = {
	name: "gameMap",
	areas: [
		{ name: "woods", shape: "rect", coords: [349, 322, 445, 354], preFillColor: "rgba(255,255,255,0.2)", strokeColor: "1px dottedrgba(255, 255, 255, 1)" },
		{ name: "factory", shape: "rect", coords: [415, 426, 528, 455], preFillColor: "rgba(255,255,255,0.2)", strokeColor: "rgba(255, 255, 255, 1)" },
		{ name: "customs", shape: "rect", coords: [552, 340, 670, 372], preFillColor: "rgba(255,255,255,0.2)", strokeColor: "rgba(255, 255, 255, 1)" },
		{ name: "interchange", shape: "rect", coords: [601, 282, 769, 313], preFillColor: "rgba(255,255,255,0.2)", strokeColor: "rgba(255, 255, 255, 1)" },
		{ name: "shoreline", shape: "rect", coords: [337, 696, 474, 726], preFillColor: "rgba(255,255,255,0.2)", strokeColor: "rgba(255, 255, 255, 1)" },
		{ name: "lighthouse", shape: "rect", coords: [238, 607, 389, 641], preFillColor: "rgba(255,255,255,0.2)", strokeColor: "rgba(255, 255, 255, 1)" },
		{ name: "reserve", shape: "rect", coords: [257, 498, 366, 527], preFillColor: "rgba(255,255,255,0.2)", strokeColor: "rgba(255, 255, 255, 1)" },
		{ name: "thelab", shape: "rect", coords: [363, 175, 509, 206], preFillColor: "rgba(255,255,255,0.2)", strokeColor: "rgba(255, 255, 255, 1)" },

	]
}
function MapPage() {
	let navigate = useNavigate();

	const dispatch = useDispatch()
	const mapState = useSelector(state => state.map);

	const [cursor, setCursor] = useState("auto");

	const handleClick = (area, index, event) => {
		const mapName = area.name;
		navigate(mapName)
	}

	useEffect(() => {
		if (mapState.data === undefined) {
			dispatch(getMapDataFromStorage());
		}
	}, [mapState.data])

	return (
		<Fragment>
			{mapState.data !== undefined &&
				<Container className="text-center" style={{ cursor: cursor }}>
					{/* // <Map map={map} images={mapJson[map].images} description={mapJson[map].description} setMap={setMap}></Map> */}
					<ImageMapper
						src="https://res.cloudinary.com/swpgogogo/image/upload/v1649471250/tarkov/map/menu_q8dfid.png"
						map={mapArea}
						onMouseEnter={() => { setCursor("pointer") }}
						onMouseLeave={() => { setCursor("auto") }}
						onClick={handleClick}
					/>

				</Container>
			}
		</Fragment>
	)
}

export default MapPage;