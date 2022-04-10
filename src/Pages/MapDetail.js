import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import { Col, Container, Image, Row, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { getStorage } from "../Services/firebaseService";
import { getMapImages } from "../Store/mapSlice";
import { getMapDataFromStorage } from './../Store/mapSlice';
import styles from "./MapDetail.module.scss";
import ReactPanZoom from 'react-image-pan-zoom-rotate';

function MapDetail() {
	let navigate = useNavigate();

	const [imageView, setImageView] = useState(undefined);

	const [image, setImage] = useState({ largeImg: [], smallImg: [] });
	const dispatch = useDispatch()
	const mapState = useSelector(state => state.map);

	const { mapName } = useParams()
	const [map, setMap] = useState(undefined);

	const getImg = async () => {
		setImage({ largeImg: [], smallImg: [] })
		var storage = getStorage();
		storage.ref(`/map/${mapName}`).listAll().then((resp) => {
			var list = resp.items;

			var tmpSmall = list.filter(item => item.fullPath.includes("small"));
			var tmpLarge = list.filter(item => !item.fullPath.includes("small"));
			var p = Promise.resolve()

			p = p.then(async function () {
				for (const item of tmpSmall) {

					try {
						await item.getDownloadURL().then((downloadURL) => {
							setImage((prev) => ({ largeImg: prev.largeImg, smallImg: [...prev.smallImg, downloadURL] }));
						})
					} catch (err) {
						console.log(err);
					}

				}
			})

			p = p.then(async function () {
				for (const item of tmpLarge) {

					try {
						await item.getDownloadURL().then((downloadURL) => {
							setImage((prev) => ({ largeImg: [...prev.largeImg, downloadURL], smallImg: prev.smallImg }))
						})
					} catch (err) {
						console.log(err);
					}
				}
			});
		})
	}

	useEffect(() => {
		if (mapState.data === undefined) {
			dispatch(getMapDataFromStorage());
		} else {
			setMap(mapState.data[mapName])
		}
	}, [mapState.data])


	useEffect(() => {
		if (map !== undefined) {
			if (mapState.mapImages[mapName] === undefined) {
				dispatch(getMapImages(mapName));
			}
		}
	}, [map])

	const handleClick = (src) => {
		console.log(src);
		setImageView(src);
		// window.open(src);
	}

	const handleClose = () => {
		setImageView(undefined);
		// window.open(src);
	}

	return (
		<Fragment>

			{map &&
				<Container className="mt-5">

					<p
						className={styles.backButton}
						onClick={() => navigate("..")}
					> {" < Back"} </p>
					<h2>{map.map_name}</h2>
					<Row>
						<Col md={2}>
							<Image src={map.images.thumbnail} className="img-fluid" />
						</Col>
						<Col md={10}>
							<p className="text-white">
								{map.description}
							</p>
							<p className="lead">Duration : {map.duration}</p>
						</Col>
					</Row>

					<h2>Map (Click To View)</h2>
					{(mapState.mapImages[mapName] !== undefined) &&
						mapState.mapImages[mapName].smallImg.map((m, i) => {
							return (
								<Fragment>
									<img
										key={i}
										src={m}
										className={clsx(styles.smallMap)}
										alt="Map"
										onClick={() => { handleClick(mapState.mapImages[mapName].largeImg[i]) }}
									/>
								</Fragment>
							)
						}
						)}

					{imageView !== undefined &&
						<Modal show={imageView !== undefined} onHide={handleClose}>
							<Modal.Header closeButton>
							</Modal.Header>
							<Modal.Body>
								<ReactPanZoom image={imageView} alt="document image" />
							</Modal.Body>
						</Modal>}
					{/* {map.images.maps.map(m => (
						<img
							className={clsx(styles.smallMap)}
							src={getCorrectUrl(m, true)}
							alt="Map"
							onClick={() => { window.open(getCorrectUrl(m)) }}
						/>
					))} */}


				</Container>
			}
		</Fragment>
	);

}


export default MapDetail;