import clsx from "clsx";
import { Fragment, useEffect, useRef, useState } from "react";
import { Container, Offcanvas } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import { VerticleButton as ReactScrollUpButton } from "react-scroll-up-button";
import { getAmmoDataFromStorage } from './../Store/ammoSlice';
import styles from "./table.module.scss";

function AmmoPage() {
	const dispatch = useDispatch()

	const [showPen, setShowPen] = useState(false);
	const handleClose = () => setShowPen(false);
	const handleShow = () => setShowPen(true);

	const ammoState = useSelector(state => state.ammo);
	const [showImage, setShowImage] = useState(false);

	const [ammoData, setAmmoData] = useState([]);
	const [ammoInput, setAmmoInput] = useState("");

	const inputRef = useRef();

	useEffect(() => {
		if (ammoState.data !== undefined) {
			setAmmoData(ammoState.data)
		} else {
			dispatch(getAmmoDataFromStorage());
		}
	}, [ammoState.data])

	useEffect(() => {
		var timeoutFn = setTimeout(() => {
			if (ammoState.data !== undefined) {
				var newData = {};
				if (ammoInput.length === 0) {
					Object.keys(ammoState.data).forEach((key, value) => {
						if (!newData[key]) {
							newData[key] = [];
						}

						const ammos = ammoState.data[key];
						newData[key] = ammos;
					});
				} else {


					var newData = {};

					Object.keys(ammoState.data).forEach((key, value) => {
						if (!newData[key]) {
							newData[key] = [];
						}
						const fixName = (name) => {
							return name.toLowerCase().replace(".", "").replace("x", "").replace("mm", "").replace("/", "");
						}
						const ammos = ammoState.data[key].filter(ammo => {
							var ammoNameFix = fixName(ammo.name)
							var ammoInputFix = fixName(ammoInput)
							return ammoNameFix.includes(ammoInputFix);
							// ammo.name.toLowerCase().includes(ammoInput.toLowerCase())
						});
						// const ammos = ammoState.data[key].filter(ammo => {
						// 	var similarity = compareTwoStrings(ammoInput, ammo.name)
						// 	var result = similarity > 0.05;
						// 	console.log(ammo.name + " : " + similarity);
						// 	return result;
						// });
						newData[key] = ammos;
					});
				}
				setAmmoData(newData);
			}
		}, 300)

		return () => { clearTimeout(timeoutFn); }
	}, [ammoInput])

	const getClassColor = (number) => {
		number = parseInt(number);
		switch (number) {
			case 0:
				return styles.pen0;
			case 1:
				return styles.pen1;
			case 2:
				return styles.pen2;
			case 3:
				return styles.pen3;
			case 4:
				return styles.pen4;
			case 5:
				return styles.pen5;
			case 6:
				return styles.pen6;
			default:
				return ""
		}
	}

	return (
		<Fragment>



			<Offcanvas placement="bottom" show={showPen} onHide={handleClose} onEscapeKeyDown={handleClose} className="bg-dark h-auto">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title className="text-white">Effectiveness Table</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<table className={styles.table}>
						<tbody>
							<tr>
								<th colspan="2">Effectiveness level</th>
								<th>Average amount of bullets stopped</th>
								<th>Explanation</th>
							</tr>
							<tr className={styles.pen0}>
								<td>0</td>
								<td>Pointless</td>
								<td>20+</td>
								<td rowspan="1">Can't penetrate in any reasonable amount of hits
								</td></tr>
							<tr className={styles.pen1}>
								<td >1
								</td>
								<td >It's possible, but...
								</td>
								<td>13 to 20
								</td>
								<td rowspan="1">Typically doesn't penetrate at all for a large number of hits, or starts with a very low chance and barely increases
								</td></tr>
							<tr className={styles.pen2}>
								<td >2
								</td>
								<td >Magdump only
								</td>
								<td>9 to 13
								</td>
								<td rowspan="1">Has a very low or no penetration chance initially and very slowly gains chance
								</td></tr>
							<tr className={styles.pen3}>
								<td >3
								</td>
								<td >Slightly effective
								</td>
								<td>5 to 9
								</td>
								<td rowspan="1">Has a low penetration chance initially and slowly gains chance, or quickly damages armor until it penetrates
								</td></tr>
							<tr className={styles.pen4}>
								<td >4
								</td>
								<td >Effective
								</td>
								<td>3 to 5
								</td>
								<td rowspan="1">Starts with a low-medium penetration chance but quickly increases
								</td></tr>
							<tr className={styles.pen5}>
								<td >5
								</td>
								<td >Very effective
								</td>
								<td>1 to 3
								</td>
								<td rowspan="1">Penetrates a large percent of the time initially, often quickly going to &gt;90%
								</td></tr>
							<tr className={styles.pen6}>
								<td >6
								</td>
								<td >Basically ignores
								</td>
								<td>&lt;1
								</td>
								<td rowspan="1">Initially penetrates &gt;80% of the time
								</td></tr></tbody></table>
				</Offcanvas.Body>
			</Offcanvas>

			<Container fluid>
				{ammoState.data !== undefined &&
					<table className={styles.table}>
						<thead>
							<tr>
								<th colSpan={showImage ? 8 : 7}>
									<div className="form-check">
										<input
											className="form-check-input"
											type="checkbox"
											id="cbImage"
											onChange={e => setShowImage(!showImage)}
											value="
									"></input>
										<label htmlFor="cbImage" className="form-check-label">Show Image (May cause lag when search)</label>
									</div>
									<div className="form-group">
										<label htmlFor="txtSearch">Search</label>
										<input
											className="form-control"
											value={ammoInput}
											onChange={(e) => setAmmoInput(e.target.value)}
											ref={inputRef}
											id="txtSearch"
										/>
									</div>
								</th>
								<th colSpan={2} style={{ textAlign: "center" }}>Bleed %</th>
								<th colSpan={6}>Armor Class's <a href="#" onClick={handleShow}>Effectiveness</a></th>
							</tr>
							<tr>
								{showImage && <th></th>}
								<th>Name</th>
								<th>Damage</th>
								<th>Penetration Power</th>
								<th>Armor Damage</th>
								<th>Accuracy</th>
								<th>Recoil</th>
								<th>Frag-chance</th>
								<th>Light</th>
								<th>Heavy</th>
								<th>1</th>
								<th>2</th>
								<th>3</th>
								<th>4</th>
								<th>5</th>
								<th>6</th>
								{/* <th>Trader</th> */}
							</tr>
						</thead>
						<tbody>
							{
								Object.keys(ammoData).map((key) => (
									<Fragment>
										{ammoData[key].length > 0 && <tr><th className={clsx(styles.stickyCol, styles.firstCol, styles.ammoCategory)} key={key} colSpan={16}>{key}</th></tr>}
										{ammoData[key].length > 0 && ammoData[key].map(a => (
											<tr key={a.name} className={styles.items} onClick={() => window.open(`https://escapefromtarkov.fandom.com${a.ammoLink}`)}>
												{showImage && <td key={a.name}>
													<Image src={a.ammoImage} width="50px" />
												</td>
												}
												<td className={clsx(styles.stickyCol, styles.firstCol, styles.highlight)}>
													{a.name}
												</td>
												<td>{a.damage}</td>
												<td>{a.penPwr}</td>
												<td>{a.armorDmg} %</td>
												<td className={a.accuracy.includes("+") ? styles.green : styles.red}>{a.accuracy}</td>
												<td className={a.accuracy.includes("+") ? styles.green : styles.red}>{a.recoil}</td>
												<td>{a.fragChance}</td>
												<td className={styles.smallColumn}>{a.bleedLight}</td>
												<td className={styles.smallColumn}>{a.bleedHeavy}</td>
												<td className={getClassColor(a.armor1)}>{a.armor1}</td>
												<td className={getClassColor(a.armor2)}>{a.armor2}</td>
												<td className={getClassColor(a.armor3)}>{a.armor3}</td>
												<td className={getClassColor(a.armor4)}>{a.armor4}</td>
												<td className={getClassColor(a.armor5)}>{a.armor5}</td>
												<td className={getClassColor(a.armor6)}>{a.armor6}</td>
												{/* <td >{a.moreInfo}</td> */}
											</tr>
										))}
									</Fragment>
								))
							}
						</tbody>
					</table>
				}
				<ReactScrollUpButton />
			</Container>
		</Fragment>
	)
}

export default AmmoPage;