import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Home() {
	return (
		<Fragment>
			<Container className="mt-3">
				<span className="h1">
					Welcome to {" "}
					<span class="text-primary">
						Tarkov Helper
					</span>
					<p>It's not much but still improving it :P</p>
				</span>
				<ul>
					<li><Link to="/Ammo">Ammo</Link></li>
					<li><Link to="/Maps">Maps</Link></li>
					{/* <li><Link to="/Bosses">Bosses</Link></li> */}
				</ul>

			</Container>
		</Fragment>)
}

export default Home;