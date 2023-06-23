import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import ScrollToTop from "./helpers/ScrollToTop";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
function App() {
	const { theme } = useTheme();
	return (
		<BrowserRouter>
			<ScrollToTop />
			<div className="layout-wrapper" data-bs-theme={theme}>
				<NavBar />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
