import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// env variables
	define: {
		VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY,
		VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
	},
});
