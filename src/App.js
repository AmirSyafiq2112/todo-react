import "./App.css";
import Home from "./Home";
import NotFound from "./Screen/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Navbar />
				<div className="content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
