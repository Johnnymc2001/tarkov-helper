import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
	return (
		<Container className="text-center align-items-center">
			<h1>Oops, this page doesn't exist!</h1>
			<Link to="/">to HomePage?</Link>
		</Container>
	)
}

export default NotFound;