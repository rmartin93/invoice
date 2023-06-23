import logo from "../assets/logo-with-bg.svg";
import userIcon from "../assets/image-avatar.jpg";
import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "../hooks/useTheme";
export default function NavBar() {
	const { theme, toggleTheme } = useTheme();
	return (
		<div className="myNavBar text-info bg-secondary">
			<img class="img-fluid bg-primary rounded-end-4" src={logo} alt="logo" />
			<div className="nav-btns">
				<button
					type="button"
					className="btn btn-icon-only text-info"
					onClick={() => toggleTheme(theme)}
				>
					{theme === "dark" ? <BsSun /> : <BsMoon />}
				</button>
				<div className="nav-seperator"></div>
				<img
					className="userIcon rounded-circle"
					src={userIcon}
					alt="User Icon"
				/>
			</div>
		</div>
	);
}
