import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import ScrollToTop from "./helpers/ScrollToTop";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { useState } from "react";
import Invoice from "./pages/Invoice";
function App() {
	const { theme } = useTheme();
	const [invoiceId, setInvoiceId] = useState(null);
	return (
		<BrowserRouter>
			<ScrollToTop />
			<div className="layout-wrapper" data-bs-theme={theme}>
				<NavBar invoiceId={invoiceId} setInvoiceId={setInvoiceId} />
				<main>
					<Routes>
						<Route path="/" element={<Home setInvoiceId={setInvoiceId} />} />
					</Routes>
					<Routes>
						<Route
							path="/invoice/:id"
							element={<Invoice setInvoiceId={setInvoiceId} />}
						/>
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
