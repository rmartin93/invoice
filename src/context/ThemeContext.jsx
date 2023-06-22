import { createContext, useState } from "react";

export const ThemeContext = createContext("light");

export const ThemeProvider = ({ children }) => {
	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	const [theme, setTheme] = useState("light");

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
