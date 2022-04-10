
import { Fragment, useState } from "react";
import { ListGroup, ListGroupItem, Nav, Offcanvas } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import styles from "./OffcanvasSidebar.module.scss";
function OffcanvasSidebar() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<Fragment>
			<button onClick={handleShow} className={styles.menuButton}>
				<AiOutlineMenu />
			</button>

			<Offcanvas show={show} onHide={handleClose} onEscapeKeyDown={handleClose} className="bg-dark">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title className="text-white">Menu</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Nav >
						<Nav.Item>
							<Link to="/" className="nav-link">Home</Link>
						</Nav.Item>
						<Nav.Item>
							<Link to="/ammo" className="nav-link">Ammo</Link>
						</Nav.Item>
						<Nav.Item>
							<Link to="/maps" className="nav-link">Maps</Link>
						</Nav.Item>
					</Nav>
				</Offcanvas.Body>
			</Offcanvas>
		</Fragment>
	);
}


export default OffcanvasSidebar;