import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="navbar">
			<h1>Helping You Complete Your Task</h1>
			<div className="links">
				<Link to="/">Home</Link>
				<Link className="login-button">Login</Link>
				<div className="message">Login is coming soon</div>
			</div>
		</nav>
	);
};

export default Navbar;
