import logo from "../assets/logo-with-bg.svg";
import userIcon from "../assets/image-avatar.jpg";
import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "../hooks/useTheme";
import { supabase } from "../database/supabaseClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiLink, BiUnlink, BiArrowFromRight } from "react-icons/bi";
export default function NavBar({ session }) {
	const [webhookUrl, setWebhookUrl] = useState(null);
	useEffect(() => {
		getWebhookUrl();
	}, [session]);
	const getWebhookUrl = async () => {
		const { data, error } = await supabase
			.from("webhooks")
			.select("webhook_url")
			.eq("user_id", session.user.id)
			.single();
		if (error) {
			console.log("error: ", error);
			setWebhookUrl(null);
			return;
		}
		setWebhookUrl(data.webhook_url);
	};
	const { theme, toggleTheme } = useTheme();
	const identities = session.user.identities;
	let avatarUrl = null;
	identities.forEach((identity) => {
		if (identity.provider === "github") {
			avatarUrl = identity.identity_data.avatar_url;
		}
	});
	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			alert(error.message);
			return;
		}
		window.location.reload();
	};
	return (
		<div className="myNavBar text-info bg-secondary">
			<Link to="/">
				<img className="logo bg-primary rounded-end-4" src={logo} alt="logo" />
			</Link>
			<div className="nav-btns">
				{/* <Link to="/connect" className="btn btn-icon-only text-info">
					{webhookUrl ? <BiLink /> : <BiUnlink />}
				</Link> */}
				<button
					type="button"
					className="btn btn-icon-only text-info"
					onClick={() => toggleTheme(theme)}
					title="Toggle Theme"
				>
					{theme === "dark" ? <BsSun /> : <BsMoon />}
				</button>
				<button
					type="button"
					className="btn btn-icon-only text-info"
					onClick={() => signOut()}
					title="Sign Out"
				>
					<BiArrowFromRight />
				</button>
				<div className="nav-seperator"></div>
				<img
					className="userIcon rounded-circle"
					src={avatarUrl ? avatarUrl : userIcon}
					alt="User Icon"
				/>
			</div>
		</div>
	);
}
