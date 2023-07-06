import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import ScrollToTop from "./helpers/ScrollToTop";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Invoice from "./pages/Invoice";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { supabase } from "./database/supabaseClient";
function App() {
	const { theme } = useTheme();
	const [session, setSession] = useState(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	if (!session) return <Login />;

	return (
		<BrowserRouter>
			<ScrollToTop />
			<div className="layout-wrapper" data-bs-theme={theme}>
				<NavBar />
				<main>
					<Routes>
						<Route path="/" element={<Home session={session} />} />
						<Route
							path="/invoice/:id"
							element={<Invoice session={session} />}
						/>
						<Route path="/login" element={<Login />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
