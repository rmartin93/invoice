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
			<NavBar />
			<main data-bs-theme={theme}>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
